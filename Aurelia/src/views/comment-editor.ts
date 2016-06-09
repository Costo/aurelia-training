import {DOM, autoinject, bindable, observable, child} from 'aurelia-framework';
import {ApiService, Comment} from 'services/api';

@autoinject()
export class CommentEditorCustomElement{

    @bindable postId: number;
    element: Element;
    api: ApiService;
    @observable name: string;
    email: string;
    comment: string;


    constructor(element: Element, api: ApiService) {
        this.element = element;
        this.api = api;
    }

    reset() {
        this.name = '';
        this.email = '';
        this.comment = '';
    }

    submit(event: Event): void {

        let button = event.srcElement;
        button.setAttribute("disabled", "disabled");

        let comment: Comment = {
            body: this.comment,
            email: this.email,
            name: this.name,
            postId: this.postId,
            id: 0
        };
        let evt = DOM.createCustomEvent('save', { bubbles: true, detail: comment });

        this.api.saveComment(comment)
            .then(_ => this.element.dispatchEvent(evt))
            .then(_ => this.reset())
            .then(_ => button.removeAttribute("disabled"));

        
    }

    nameChanged(newValue: string, oldValue: string) {
        console.log(`name: [${newValue}]`);
    }

}