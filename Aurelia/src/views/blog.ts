import {ApiService, BlogPost, userId} from 'services/api';
import {autoinject} from 'aurelia-framework';

@autoinject
export class Blog {
    
    posts: BlogPost[];
    
    constructor(api: ApiService) {

        api.getPosts(userId)
            .then(posts => this.posts = posts);
    } 

}