# Cheat Sheet


## Bootstrap navbar
```html
<nav class="navbar navbar-default">
    <div class="container-fluid">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="#">Aurelia</a>
        </div>

        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav">
                <li class="active"><a href="#">Blog</a></li>
                <li class=""><a href="#">Gallery</a></li>
            </ul>
        </div><!-- /.navbar-collapse -->
    </div><!-- /.container-fluid -->
</nav>
    
```

## Router configuration

In app.html
```html
<router-view></router-view>
```
In app.ts
```ts
import {RouterConfiguration, Router} from 'aurelia-router';

```
```ts
configureRouter(config: RouterConfiguration, router: Router) {

    config.map([
        { route: ["", "blog"], name: "blog", moduleId: "views/blog", nav: true },
        { route: ["blog/:id"], name: "blog-post", moduleId: "views/blog-post", nav: true, href: 'blog/0' },
        { route: ["gallery"], name: "gallery", moduleId: "views/gallery", nav: true },
        { route: ["gallery/:id"], name: "album", moduleId: "views/album", nav: true, href: 'gallery/0' }
    ]);

    this.router = router;
}
```

## Navbar routes
In app.ts
```ts
get routeName(): string {
    return this.router
        && this.router.currentInstruction
        && this.router.currentInstruction.config.name;
}
```
Replace in app.html
```html
<ul class="nav navbar-nav">
    <li class="${ ['blog', 'blog-post'].includes(routeName) ? 'active': '' }"><a route-href="route: blog">Blog</a></li>
    <li class="${ ['gallery', 'album'].includes(routeName) ? 'active': ''}"><a route-href="route: gallery">Gallery</a></li>
</ul>
```

## Api
```ts
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
}
```

### Functions
```ts
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
```
### Interfaces
```ts
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

export interface Address {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
}

export interface Company {
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
```

## Custom elements

### User infos

In user-infos.html
```html
<template show.bind="user">
    Hello, my name is ${name}. Contact me at <a href.bind="mailto">${user.email}</a>.

    I work at ${user.company.name} where I ${user.company.bs}.
</template>
```

In user-infos.ts
```ts
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
```

### Comment editor
In comment-editor.html
```html
<template>
    <form>
        <div class="form-group">
            <label for="name">Your name</label>
            <input class="form-control" type="text" id="name" value.bind="name" />
        </div>
        <div class="form-group">
            <label for="email">Your email</label>
            <input class="form-control" type="text" id="email" value.bind="email" />
        </div>
        <div class="form-group">
            <label for="comment">Your comment</label>
            <textarea class="form-control" id="comment" value.bind="comment & debounce:500"></textarea>
            <p>Character count: ${comment.length}</p>
        </div>
        <div class="form-group">
            <button type="submit" class="btn" click.delegate="submit($event)">Submit</button>
        </div>
    </form>

</template>
```
In comment-editor.ts
```ts
import {DOM, autoinject, bindable, observable, child} from 'aurelia-framework';
import {ApiService, Comment} from 'services/api';

@autoinject()
export class CommentEditorCustomElement{

    @bindable postId: number;
    element: Element;
    api: ApiService;
    @observable name: string;
    email: string;
    comment: string;


    constructor(element: Element, api: ApiService) {
        this.element = element;
        this.api = api;
    }

    reset() {
        this.name = '';
        this.email = '';
        this.comment = '';
    }

    submit(event: Event): void {

        let button = event.srcElement;
        button.setAttribute("disabled", "disabled");

        let comment: Comment = {
            body: this.comment,
            email: this.email,
            name: this.name,
            postId: this.postId,
            id: 0
        };
        let evt = DOM.createCustomEvent('save', { bubbles: true, detail: comment });

        this.api.saveComment(comment)
            .then(_ => this.element.dispatchEvent(evt))
            .then(_ => this.reset())
            .then(_ => button.removeAttribute("disabled"));

        
    }

    nameChanged(newValue: string, oldValue: string) {
        console.log(`name: [${newValue}]`);
    }

}
```

## Pages
### App

In app.html
```html
<require from="views/user-info"></require>
    <div class="container">
        <div class="row">
            <div class="col-md-8">
                <router-view></router-view>
            </div>
            <div class="col-md-4">
                <div class="panel">
                    <h3>About Me</h3>
                    <user-info user.bind="user"></user-info>
                </div>
            </div>
        </div>
    </div>
```

In app.ts
```ts

```

### Blog

In blog.html
```html
<template>
    <require from="converters/take"></require>
    <h1>My blog</h1>
    <div class="au-stagger">
        <article repeat.for="post of posts | take:5" class="au-animate">
            <h2>
                <a route-href="route: blog-post;
               params.bind: {id: post.id}">${post.title}</a>
            </h2>
            <p>
                ${post.body}
            </p>
        </article>
    </div>
</template>
```

In blog.ts
```ts
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
```
### Blog post
In blog-post.html
```html
<template>
    <require from="./comment-editor" ></require>
    <h1 textContent.bind="post.title"></h1>
    <article>
        <p textContent.bind="post.body"></p>
    </article>
    <section if.bind="post" class="au-stagger">
        <h3>What do you think?</h3>
        <comment-editor save.delegate="saveComment($event)" post-id.bind="post.id"></comment-editor>
        <h3>Comments</h3>
        <div repeat.for="comment of comments" class="au-animate">
            <blockquote>
                <p textContent.bind="comment.body"></p>
                <footer>
                    ${comment.name}&nbsp;(${comment.email})
                </footer>
            </blockquote>
        </div>

    </section>
</template>
```

In blog-post.html
```ts
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
        let comment = evt.detail as Comment;
        this.comments.unshift(comment);
    }
}

interface Params {
    id: string;
}
```

### Gallery
In gallery.html
```html
<template>
    <h1>My albums</h1>

    <div repeat.for="album of albums">
        <p class="lead">
            <a route-href="route: album; params.bind: {id: album.id}" textContent.bind="album.title"></a>
        </p>
    </div>
</template>
```

In gallery.ts
```ts
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
```

### Album
In album.html
```html
<template>
    <div class="row">
        <div class="col-md-3" repeat.for="photo of photos">
            <div class="thumbnail">
                <img src.bind="photo.thumbnailUrl" />
                <div class="caption">
                    <p textContent.bind="photo.title"></p>
                </div>
            </div>
        </div>
    </div>
</template>
```

In album.ts
```
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
```

## Converter sample
```ts
export class TakeValueConverter {
    toView(value: any, count: number) {
        if (Array.isArray(value)) {
            return (value as []).slice(0, count);
        }
        return value;
    }
}
```

## Misc
### TypeScript rest parameters
```ts
class Count {
    count(...params: string[]): number {
        return params.length;
    }
}
```
```ts
let counter = new Counter().
let count = counter.count('a', 'b', 'c', 'd');
```