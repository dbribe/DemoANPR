import {UI, Link, Image, Button, registerStyle, keyframesRule} from "UI";
import {StyleSheet, styleRule} from "UI";
import {UploadFilesCuJapca} from "./Storage";


class CardStyle extends StyleSheet {
    @styleRule
    container = {
        width: "80vw",
        marginTop: "-10px",
        height: "calc(100vh - 140px)",
        maxHeight: "100%",
        maxWidth: "100%",
        backgroundColor: "#fff",
        boxShadow: "rgba(0,0,0,.23) 0px 0px 10px",
        borderRadius: "20px",
        textAlign: "center",
    };

    @styleRule
    header = {
        height: "100px",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "28px",
    };

    @styleRule
    body = {
        paddingLeft: "20px",
        paddingRight: "20px",
        paddingBottom: "40px",
        textAlign: "center",
        fontSize: "17px",
        ">p": {
            margin: "0px",
        }
    };
}

class IndexPageStyle extends StyleSheet {
    @styleRule
    container = {
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
    };

    @styleRule
    bottomContainer = {
        flexGrow: "2",
        width: "100%",
        fontSize: "18px",
        paddingTop: "20px",
        textAlign: "center",
    };

    @styleRule
    imageContainer = {
        position: "relative",
        margin: "18px 22px",
        height: "calc(100% - 92px)",
        textAlign: "center",
    };

    @styleRule
    image = {
        maxHeight: "100%",
        maxWidth: "100%",
        width: "unset",
        position: "relative",
        borderRadius: "8px",
        border: "2px solid #5725aa"
    };

    @styleRule
    boxContainer = {
        height: "-webkit-fill-available",
        width: "fit-content",
        margin: "0 auto",
        maxHeight: "fit-content",
        position: "relative",
        top: "50%",
        transform: "translateY(-50%)",
    };

    @keyframesRule
    spin = {
        "0%": {
            transform: "rotate(0deg)",
        },
        "100%": {
            transform: "rotate(360deg)",
        }
    };

    @styleRule
    loader = {
        border: "7px solid #00ff66",
        borderTop: "7px solid #00000000",
        borderRadius: "50%",
        width: "50px",
        height: "50px",
        animation: "" + this.spin + " .7s linear infinite",
    };

    @styleRule
    loaderContainer = {
        display: "none",
        position: "absolute",
        background: "#000",
        opacity: "0",
        borderRadius: "100%",
        padding: "10px",
        zIndex: "2",
        margin: "0 auto",
        left: "50%",
        transform: "translate(-50%, -50%)",
        top: "50%",
        transition: "opacity ease 1s",
    }
}


@registerStyle(CardStyle)
export class Card extends UI.Element {
    extraNodeAttributes(attr) {
        attr.addClass(this.styleSheet.container);
    }
}


@registerStyle(IndexPageStyle)
export class IndexPage extends UI.Element {
    extraNodeAttributes(attr) {
        attr.addClass(this.styleSheet.container);
    }

    render() {
        const {styleSheet} = this;

        return [
            <Card>
                <div className={styleSheet.imageContainer}>
                    <div ref="loaderContainer" className={styleSheet.loaderContainer}>
                        <div className={styleSheet.loader}/>
                    </div>
                    <div className={styleSheet.boxContainer} ref="boxContainer">
                        <Image ref="img" className={styleSheet.image} src="static/ANPR_placeholder.png" />
                    </div>
                </div>
                <UploadFilesCuJapca ref="uploader"/>
            </Card>
        ];
    }

    onMount() {
        this.uploader.addListener("sourceUpdate", path => {
            this.img.setAttribute("src", path);
            this.boxContainer.updateOptions({
                children: [this.img]
            });
            this.loaderContainer.setStyle("display", "block");
            setTimeout(() => {
                this.loaderContainer.setStyle("opacity", ".7");
            }, 1500);
        });
        this.uploader.addListener("received", event => {
            this.loaderContainer.setStyle("display", "none");
            this.loaderContainer.setStyle("opacity", "0");
            for (const match of event.response) {
                this.boxContainer.appendChild(<BoundingBox data={match}/>)
            }
        })
    }
}


class BoundingBoxStyle extends StyleSheet {
    @styleRule
    boundingBox = {
        border: "2px solid springgreen",
        position: "absolute",
        fontColor: "springgreen",
        fontSize: "17px",
        color: "springgreen",
    };

    @styleRule
    label = {
        position: "absolute",
        bottom: "-26px",
        padding: "2px",
        background: "rgba(0,0,0,.3)",
        margin: "0 auto",
        transform: "translateX(-50%)",
        left: "50%",
        whiteSpace: "nowrap",
    };
}


@registerStyle(BoundingBoxStyle)
class BoundingBox extends UI.Element {
    extraNodeAttributes(attr) {
        super.extraNodeAttributes(attr);
        attr.addClass(this.styleSheet.boundingBox);
        const left = this.options.data.boundingBox[0];
        const top = this.options.data.boundingBox[1];
        const width = this.options.data.boundingBox[2] - left;
        const height = this.options.data.boundingBox[3] - top;
        attr.setStyle({
            left: left * 100 + "%",
            top: top * 100 + "%",
            width: width * 100 + "%",
            height: height * 100 + "%",
        })
    }

    render() {
        return <div className={this.styleSheet.label}>{this.options.data.label}</div>
    }
}