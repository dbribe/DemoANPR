import {UI} from "UI";
import {TextTranslationEntry} from "./TextTranslationEntry";
import {TextTranslationStore} from "../state/TextTranslationStore";
import {Ajax} from "Ajax";


export class TextTranslationList extends UI.Element {
    render() {
        return TextTranslationStore.all().map(x => <TextTranslationEntry translation={x} />);
    }

    onMount() {
        super.onMount();
        TextTranslationStore.addCreateListener(() => this.redraw());
        Ajax.postJSON("/user_state/", {});
    }
}