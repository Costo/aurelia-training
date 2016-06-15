import {autoinject} from 'aurelia-framework';
import {ApiService, Album as ApiAlbum, Photo} from 'services/api'; 

@autoinject
export class Album
{
    api: ApiService;
    album: ApiAlbum;
    photos: Photo[];

    constructor(api: ApiService) {
        this.api = api;
    }

    activate(params: any) {
        return this.api.getAlbum(Number(params.id))
            .then(album => this.album = album)
            .then(album => this.api.getPhotos(album))
            .then(photos => this.photos = photos);
        
    }
}