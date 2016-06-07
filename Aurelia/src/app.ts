import 'core-js';
import {autoinject, computedFrom} from 'aurelia-framework';
import {RouterConfiguration, Router} from 'aurelia-router';
import {ApiService, User, userId} from 'services/api';

@autoinject
export class App {
  
  user: User;
  
  constructor(api: ApiService) {
    api.getUser(userId).then(user => this.user = user)
    
  }
  
  @computedFrom('user')
  get message() {
    if(this.user) {
      return `Welcome to ${this.user.name}'s website !!!!!!!`;
    }
    return 'Loading...';
  }
  
  configureRouter(config: RouterConfiguration, router: Router) {
    
    config.map([
      { route: ["", "blog"], name: "blog", moduleId: "views/blog", nav: true },
      { route: ["gallery"], name: "gallery", moduleId: "views/gallery", nav: true }
    ]);
    
  }
  
  
}
