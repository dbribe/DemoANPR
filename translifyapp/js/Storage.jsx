import {UI, ActionModal, TemporaryMessageArea, ButtonGroup, Button, AjaxButton,
        FileInput, TextInput, ProgressBar, Level} from "UI";
import {Ajax} from "Ajax";

import {StorageLimits} from "./StorageLimits";
import {PublicStorageFileStore} from "./state/PublicFileStore";


function humanFileSize(size) {
    let i = Math.floor(Math.log(size) / Math.log(1024));
    return (size / Math.pow(1024, i) ).toFixed(2) * 1 + " " + ["B", "kB", "MB", "GB", "TB"][i];
};


export class UploadFilesCuJapca extends UI.Element {
    render() {
        return [
            <Button ref="button" label="Upload" style={{
                position: "relative",
                borderRadius: "21px",
                color: "white",
                fontSize: 23,
                border: "none",
                background: "#5824AA",
            }}>
                <FileInput
                    style={{
                        position: "absolute",
                        height: "100%",
                        width: "100%",
                        top: 0,
                        cursor: "pointer",
                        left: 0,
                        opacity: 0,
                    }}
                    className="pull-left" ref="fileInput" multipleFiles />
            </Button>,
        ];
    }

    onMount() {
        super.onMount();

        this.fileInput.addChangeListener(() => {
            if (!(window.File && window.FileReader && window.FileList && window.Blob)) {
                console.error('The File APIs are not fully supported in this browser.');
                return false;
            }
            this.upload()
        });
    }

    upload() {
        let files = this.fileInput.getFiles();

        if (files.length == 0) {
            this.dispatch("error", {})
            return;
        } else {
            const reader = new FileReader();

            reader.onload = (e) => {
                this.dispatch("sourceUpdate", e.target.result)
            };

            reader.readAsDataURL(files[0]);
        }

        if (!StorageLimits.validateUploadMaxCount(files.length)) {
            this.dispatch("error", {})
            return;
        }

        let storageMeta = PublicStorageFileStore.getStorageMeta();

        if (!StorageLimits.validateFileMaxCount(storageMeta, files.length)) {
            this.dispatch("error", {})
            return;
        }

        let totalSize = 0;
        let formData = new FormData();

        for (let index = 0; index < files.length; ++index) {
            if (!StorageLimits.validateFileMaxSize(files[index].size)) {
                this.dispatch("error", {})
                return;
            }
            formData.append(files[index].name, files[index]);
            totalSize += files[index].size;
        }

        if (!StorageLimits.validateTotalMaxSize(storageMeta, totalSize)) {
            this.dispatch("error", {})
            return;
        }

        formData.append("title", "nume_fisier");

        let fileUploadRequest = Ajax.post("/recognize/", {
            dataType: "json",
            data: formData,
            cache: false,
            processData: false,
            contentType: false,
        });

        fileUploadRequest.then(
            (data) => this.dispatch("received", data),
            (error) => {
                this.dispatch("error", {})
            }
        );
    }
}
