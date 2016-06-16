import {autoinject} from 'aurelia-framework';
import {NavigationInstruction, RouteConfig} from 'aurelia-router';

@autoinject
export class BlogPost {

    activate(params: Params, routeConfig: RouteConfig, navigationInstruction: NavigationInstruction) {

    }
}

interface Params {
    id: string;
}