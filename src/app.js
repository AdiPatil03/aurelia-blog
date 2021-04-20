import { inject } from "aurelia-framework";
import { EventAggregator } from 'aurelia-event-aggregator';
import { PostService } from './common/services/post-service';
import { AuthService } from './common/services/auth-service';

@inject(EventAggregator, PostService, AuthService)
export class App {
  constructor(EventAggregator, PostService, AuthService){
    this.ea = EventAggregator;
    this.postService = PostService;
    this.authService = AuthService;
  }

  attached() {
    this.error = '';
    this.updateSidebar();
    this.currentUser = sessionStorage.getItem('userName');
    this.userNameSub = this.ea.subscribe('userName', userName => {
      this.currentUser = userName;
    });
    this.updatedPost = this.ea.subscribe('post-updated', () => {
      this.updateSidebar();
    });
  }

  updateSidebar() {
    this.postService.allTags().then(data => {
      this.tags = data.tags;
    }).catch(error => {
      this.error = error.message;
    });
    this.postService.allArchives().then(data => {
      this.archives = data.archives;
    }).catch(error => {
      this.error = error.message;
    });
  }

  configureRouter(config, router) {
    this.router = router;
    config.title = '';
    config.map([
      {route: '', name: 'home', title: 'Home', moduleId: 'posts/index'},
      {route: 'login', name: 'login', title: 'Log In', moduleId: 'auth/login'},
      {route: 'signup', name: 'signup', title: 'Sign Up', moduleId: 'auth/signup'},
      {route: 'create-post', name: 'create-post', title: 'Create Post', moduleId: 'posts/create'},
      {route: 'posts/:slug', name: 'post-view', title: 'View Post', moduleId: 'posts/view'},
      {route: 'posts/:slug/edit', name: 'post-edit', title: 'Edit Post', moduleId: 'posts/edit'},
      {route: 'tag/:tag', name: 'tag-view', title: 'View Tag', moduleId: 'posts/tag-view'},
      {route: 'archive/:archive', name: 'archive-view', title: 'View Archive', moduleId: 'posts/archive-view'}
    ]);
  }

  logout() {
    this.authService.logout().then(data => {
      this.ea.publish('userName', null);
      sessionStorage.setItem('userName', null);
      this.router.navigateToRoute('home');
    }).catch(error => {
      this.error = error.message;
    });
  }

  detached() {
    this.userNameSub.dispose();
    this.updatedPost.dispose();
  }
}
