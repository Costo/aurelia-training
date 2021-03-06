import 'core-js';
import {autoinject, computedFrom} from 'aurelia-framework';
import {RouterConfiguration, Router} from 'aurelia-router';
import {ApiService, User} from 'services/api';
import {Configuration} from 'configuration';
@autoinject
export class App {
  
    user: User;
    router: Router;

  constructor(api: ApiService, config: Configuration) {
      api.getUser(config.userId).then(user => this.user = user)
    
  }

  get routeName(): string {
      return this.router
          && this.router.currentInstruction
          && this.router.currentInstruction.config.name;
  }
  
  configureRouter(config: RouterConfiguration, router: Router) {
    
    config.map([
      { route: ["", "blog"], name: "blog", moduleId: "views/blog", nav: true },
      { route: ["blog/:id"], name: "blog-post", moduleId: "views/blog-post", nav: true, href: 'blog/0' },
      { route: ["gallery"], name: "gallery", moduleId: "views/gallery", nav: true },
      { route: ["gallery/:id"], name: "album", moduleId: "views/album", nav: true, href: 'gallery/0' }
    ]);

    this.router = router;
  }
  
  
}
