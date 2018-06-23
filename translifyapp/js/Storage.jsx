import {UI, ActionModal, TemporaryMessageArea, ButtonGroup, Button, AjaxButton,
        FileInput, TextInput, ProgressBar, Level} from "UI";
import {Ajax} from "Ajax";

import {StorageLimits} from "./StorageLimits";
import {PublicStorageFileStore} from "./state/PublicFileStore";


function humanFileSize(size) {
    let i = Math.floor(Math.log(size) / Math.log(1024));
    return (size / Math.pow(1024, i) ).toFixed(2) * 1 + " " + ["B", "kB", "MB", "GB", "TB"][i];
};


export class UploadFilesModal extends ActionModal {
    getActionName() {
        return "Upload files";
    }

    getBody() {
        return [<div>
                <FileInput className="pull-left" ref="fileInput" multipleFiles />
            </div>,
            <TextInput ref="titleInput"/>,
            <br/>,
            <ProgressBar level={Level.SUCCESS} ref="progress">Progress</ProgressBar>
        ];
    }

    getFooter() {
        return [<TemporaryMessageArea ref="messageArea"/>,
            <ButtonGroup>
                <Button label="Close" onClick={() => this.hide()}/>
                <Button level={Level.SUCCESS} label="Upload" onClick={() => this.upload()}/>
            </ButtonGroup>
        ];
    }

    onMount() {
        super.onMount();

        this.fileInput.addChangeListener(() => {
            if (!(window.File && window.FileReader && window.FileList && window.Blob)) {
                console.error('The File APIs are not fully supported in this browser.');
                return false;
            }
            this.messageArea.clear();
            this.progress.set(0);
        });
    }

    upload() {
        let files = this.fileInput.getFiles();

        if (files.length == 0) {
            this.messageArea.showMessage("Please select some files!", "red");
            return;
        }

        if (!StorageLimits.validateUploadMaxCount(files.length)) {
            this.messageArea.showMessage("You cannot upload more than " + StorageLimits.userUploadMaxCount() + " files at once!", "red");
            return;
        }

        let storageMeta = PublicStorageFileStore.getStorageMeta();

        if (!StorageLimits.validateFileMaxCount(storageMeta, files.length)) {
            this.messageArea.showMessage("Completion of this request will exceed the maximum number of total files you can " +
                                         "store (" + StorageLimits.userFileMaxCount() + ").", "red");
            return;
        }

        let totalSize = 0;
        let formData = new FormData();

        for (let index = 0; index < files.length; ++index) {
            if (!StorageLimits.validateFileMaxSize(files[index].size)) {
                this.messageArea.showMessage("File " + files[index].name + " is too big (" +
                    humanFileSize(files[index].size) + " while maximum size per file is " +
                    humanFileSize(StorageLimits.userFileMaxSize()) + ").", "red");
                return;
            }
            formData.append(files[index].name, files[index]);
            totalSize += files[index].size;
        }

        if (!StorageLimits.validateTotalMaxSize(storageMeta, totalSize)) {
            this.messageArea.showMessage("Completion of this request will exceed the maximum total size you can store (" +
                                         humanFileSize(StorageLimits.userTotalMaxSize()) + ").", "red");
            return;
        }

        formData.append("title", this.titleInput.getValue());

        let fileUploadRequest = Ajax.post("/recognize/", {
            dataType: "json",
            data: formData,
            cache: false,
            processData: false,
            contentType: false,
        });

        fileUploadRequest.then(
            (data) => this.hide(),
            (error) => {
                this.messageArea.showMessage("Error in uploading files: status:" + error.message, "red");
            }
        );

        fileUploadRequest.addProgressListener((event) => {
            this.progressHandling(event);
        });
    }

    hide() {
        this.messageArea.clear();
        this.progress.set(0);
        super.hide();
    }

    progressHandling(event) {
        if (event.lengthComputable) {
            this.progress.set(event.loaded/event.total);
        }
    }
}