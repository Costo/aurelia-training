import {autoinject} from 'aurelia-framework';
import {NavigationInstruction, RouteConfig} from 'aurelia-router';
import {ApiService, BlogPost as Article, Comment} from 'services/api';

@autoinject
export class BlogPost {

    api: ApiService;
    post: Article;
    comments: Comment[];

    constructor(api: ApiService) {
        this.api = api;
    }

    activate(params: Params, routeConfig: RouteConfig, navigationInstruction: NavigationInstruction) {
        this.api.getPost(Number(params.id))
            .then(post => this.post = post);
        this.api.getComments(Number(params.id))
            .then(comments => this.comments = comments);
    }

    saveComment(evt: CustomEvent) {
        this.api.saveComment(evt.detail)
            .then(comment => this.comments.unshift(comment));

        
    }
}

interface Params {
    id: string;
}