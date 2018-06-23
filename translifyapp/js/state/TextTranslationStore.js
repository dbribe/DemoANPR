import {Ajax} from "Ajax";
import {StoreObject, GenericObjectStore} from "Store";
import {GlobalState} from "State";

export class TextTranslation extends StoreObject {
}

export const TextTranslationStore = new GenericObjectStore("texttranslation", TextTranslation);

window.pulamea = TextTranslationStore;
