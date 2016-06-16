import {bindable} from 'aurelia-framework'
import {User} from 'services/api'

export class UserInfoCustomElement {

    @bindable user: User;
    element: Element;

    constructor(element: Element) {
        this.element = element;

    }

    get name(): string {

        if (!this.user) return "...";

        var fullname = this.user.name.split(" ");
        fullname[2] = fullname[1];
        fullname[1] = `"${this.user.username}"`;

        return fullname.join(" ");
    }

    get mailto(): string {
        if (!this.user) return '#';
        return 'mailto:' + this.user.email;
    }
}