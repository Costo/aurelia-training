/// <reference path="../../_references.ts" />

import {HttpClient, json} from 'aurelia-fetch-client';
import {autoinject} from 'aurelia-framework';

const api: string = 'http://jsonplaceholder.typicode.com/';

export const userId: number = 1;
@autoinject
export class ApiService {

    http: HttpClient;

    constructor(http: HttpClient) {
        this.http = http;
    }

    getPosts(user: User | number): Promise<BlogPost[]> {
        let userId = typeof user === 'number'
            ? user
            : user.id;

        return this.http
            .fetch(`${api}user/${userId}/posts`)
            .then(response => response.json())
            .then(posts => posts as BlogPost[]);
    }

    getPost(id: number): Promise<BlogPost> {
        return this.http.fetch(`${api}posts/${id}`)
            .then(response => response.json())
            .then(post => post as BlogPost);
    }

    getComments(post: BlogPost | number): Promise<Comment[]> {
        let postId = typeof post === 'number'
            ? post
            : post.id; 

        return this.http.fetch(`${api}posts/${postId}/comments`)
            .then(response => response.json())
            .then(post => post as Comment[]);

    }

    saveComment(comment: Comment): Promise<Comment> {
        return this.http.fetch(`${api}comments`, {
            method: "POST",
            body: json(comment),
        })
            .then(response => response.json())
            .then(comment => comment as Comment);
    }
    
    getUser(id: number): Promise<User> {
        return this.http.fetch(`${api}users/${id}`)
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
