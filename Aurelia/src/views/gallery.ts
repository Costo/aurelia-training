import {autoinject} from 'aurelia-framework';
import {Configuration} from 'configuration';
import {ApiService, Album} from 'services/api';

@autoinject
export class Gallery {

    userId: number;
    api: ApiService;
    albums: Album[];


    constructor(config: Configuration, api: ApiService) {
        this.userId = config.userId;
        this.api = api;
    }

    activate() {
        return this.api.getAlbums(this.userId)
            .then(albums => this.albums = albums);
    }
}