import {ApiService, BlogPost} from 'services/api';
import {autoinject} from 'aurelia-framework';
import {Configuration}  from 'configuration';

@autoinject
export class Blog {
    
    posts: BlogPost[];
    
    constructor(api: ApiService, config: Configuration) {

        api.getPosts(config.userId)
            .then(posts => this.posts = posts);
    }
}