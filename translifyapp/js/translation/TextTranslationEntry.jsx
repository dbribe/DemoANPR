import {UI, Panel, StyleSheet, styleRule, registerStyle, Image} from "UI";


class TextTranslationEntryStyle extends StyleSheet {
    @styleRule
    panel = {
        background: "white",
        width: "80vw",
        maxHeight: "400px",
        display: "flex",
        flexDirection: "column",
        padding: "10px 40px",
        boxShadow: "1px 1px 6px rgba(0,0,0,.5)",
        margin: "20px",
        borderRadius: "6px"
    };

    @styleRule
    title = {
        fontSize: "2em",
        textAlign: "center",
    };

    @styleRule
    contentContainer = {
        display: "block",
        padding: "20px 0",
        flexDirection: "row",
        maxHeight: "360px",
        flex: "1",
    };

    @styleRule
    imageContainer = {
        textAlign: "center",
        width: "50%",
        height: "100%",
        display: "inline-block",
    };

    @styleRule
    image = {
        borderRadius: "4px",
        maxHeight: "325px",
        maxWidth: "100%",
    };

    @styleRule
    textContainer = {
        overflow: "auto",
        width: "50%",
        maxHeight: "100%",
        verticalAlign: "top",
        display: "inline-block",
        paddingLeft: "15px",
    };

    @styleRule
    text = {
        color: "rgba(0,0,0,.8)",
        textAlign: "justify",
    };
}


@registerStyle(TextTranslationEntryStyle)
export class TextTranslationEntry extends Panel {
    extraNodeAttributes(attr) {
        super.extraNodeAttributes(attr);
        attr.addClass(this.styleSheet.panel);
    }

    render() {
        const {styleSheet} = this;
        return [
            <div className={styleSheet.title}>{this.options.translation.title}</div>,
            <div className={styleSheet.contentContainer}>
                <div className={styleSheet.imageContainer}>
                    <Image className={styleSheet.image} src={this.options.translation.photoUrl}/>
                </div>
                <div className={styleSheet.textContainer}>
                    <div className={styleSheet.text}>{this.options.translation.content}</div>
                </div>
            </div>
        ];
    }
}