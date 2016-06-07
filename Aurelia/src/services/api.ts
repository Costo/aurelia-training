/// <reference path="../../_references.ts" />

import {HttpClient} from 'aurelia-fetch-client';
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
        .then(posts => posts as BlogPost[]) ;
    }
    
    getUser(id: number): Promise<User> {
        return this.http.fetch(`${api}users/${id}`)
        .then(response => response.json())
        .then(user => user as User);
    }
}

export interface BlogPost {
    title: string;
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
