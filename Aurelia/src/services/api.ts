/// <reference path="../../_references.ts" />

import {HttpClient, json} from 'aurelia-fetch-client';
import {autoinject} from 'aurelia-framework';
import {Configuration} from 'configuration';
import 'fetch';

interface UserId extends Number { }

@autoinject
export class ApiService {

    http: HttpClient;
    apiRoot: string;
    constructor(http: HttpClient, config: Configuration) {
        this.http = http;
        this.apiRoot = config.apiRoot;
    }

    getPosts(user: User | number): Promise<BlogPost[]> {
        let userId = typeof user === 'number'
            ? user
            : user.id;

        return this.http
            .fetch(`${this.apiRoot}user/${userId}/posts`)
            .then(response => response.json())
            .then(posts => posts as BlogPost[]);
    }

    getPost(id: number): Promise<BlogPost> {
        return this.http.fetch(`${this.apiRoot}posts/${id}`)
            .then(response => response.json())
            .then(post => post as BlogPost);
    }

    getComments(post: BlogPost | number): Promise<Comment[]> {
        let postId = typeof post === 'number'
            ? post
            : post.id; 

        return this.http.fetch(`${this.apiRoot}posts/${postId}/comments`)
            .then(response => response.json())
            .then(post => post as Comment[]);

    }

    saveComment(comment: Comment): Promise<Comment> {
        return this.http.fetch(`${this.apiRoot}comments`, {
            method: "POST",
            body: json(comment),
        })
            .then(response => response.json())
            .then(comment => comment as Comment);
    }

    getAlbums(user: User| number): Promise<Album[]> {
        let userId = typeof user === 'number'
            ? user
            : user.id;

        return this.http
            .fetch(`${this.apiRoot}user/${userId}/albums`)
            .then(response => response.json())
            .then(posts => posts as Album[]);
    }

    getAlbum(id: number): Promise<Album> {
        return this.http
            .fetch(`${this.apiRoot}albums/${id}`)
            .then(response => response.json())
            .then(album => album as Album);
    }

    getPhotos(album: Album): Promise<Photo[]> {
        return this.http
            .fetch(`${this.apiRoot}albums/${album.id}/photos`)
            .then(response => response.json())
            .then(photos => photos as Photo[]);
    }
    
    getUser(id: number): Promise<User> {
        return this.http.fetch(`${this.apiRoot}users/${id}`)
        .then(response => response.json())
        .then(user => user as User);
    }
}

export interface BlogPost {
    userId: number,
    id: number,
    title: string;
    body: string;
}

export interface Comment {
    postId: number;
    id: number;
    name: string;
    email: string;
    body: string;
}

export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
    website: string;
    address: Address;
    company: Company;
}

interface Address {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
}

interface Company {
    name: string;
    catchPhrase: string;
    bs: string;
}

export interface Album {
    id: number;
    userId: number;
    title: string;
}

export interface Photo {
    albumId: number;
    id: number;
    title: string;
    url: string;
    thumbnailUrl: string;
}
