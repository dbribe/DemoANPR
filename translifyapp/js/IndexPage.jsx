import {UI, Link, registerStyle} from "UI";
import {StyleSheet, styleRule} from "UI";
import {TextTranslationList} from "translation/TextTranslationList";


class CardStyle extends StyleSheet {
    @styleRule
    container = {
        width: "450px",
        maxHeight: "100%",
        maxWidth: "100%",
        backgroundColor: "#fff",
        boxShadow: "#a05100 0px 0px 10px",
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

class QuoteStyle extends StyleSheet {
    @styleRule
    quote = {
        color: "#aaa",
        fontStyle: "italic",
        fontSize: "17px",
        marginTop: "10px",
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
    topContainer = {
        flexGrow: "1.5",
        width: "100%",
        backgroundColor: "#f0a150",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    };

    @styleRule
    bottomContainer = {
        flexGrow: "2",
        width: "100%",
        fontSize: "18px",
        paddingTop: "20px",
        textAlign: "center",
    };
}


@registerStyle(CardStyle)
export class Card extends UI.Element {
    extraNodeAttributes(attr) {
        attr.addClass(this.styleSheet.container);
    }

    render() {
        let {headerText, bodyText} = this.options;

        return [
            <div className={this.styleSheet.header}>
                {headerText}
            </div>,
            <div className={this.styleSheet.body}>
                {
                    bodyText.map((line) => {
                        return <p>{line}</p>;
                    })
                }
            </div>
        ];
    }
}

@registerStyle(QuoteStyle)
class Quote extends UI.Element {
    render() {
        let {text, hasQuotes} = this.options,
            message = text;
        if (hasQuotes) {
            message = "\"" + message + "\"";
        }

        return <div className={this.styleSheet.quote}>
            {message}
        </div>;
    }
}

@registerStyle(IndexPageStyle)
export class IndexPage extends UI.Element {
    extraNodeAttributes(attr) {
        attr.addClass(this.styleSheet.container);
    }

    render() {
        return [
            <TextTranslationList style={{height: "100%"}}/>
        ];
    }
}