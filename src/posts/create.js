import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { Router } from 'aurelia-router';
import { PostService } from '../common/services/post-service';
import { AuthService } from '../common/services/auth-service';

@inject(EventAggregator, Router, PostService, AuthService)
export class Create {

  constructor(EventAggregator, Router, PostService, AuthService) {
    this.ea = EventAggregator;
    this.router = Router;
    this.postService = PostService;
    this.authService = AuthService;
    this.error = null;
  }

  attached() {
    // if (!this.authService.currentUser) {
    //   this.router.navigateToRoute('home');
    // }
    this.title = 'Create Post';
    this.post = {
      title: '',
      body: '',
      tags: []
    };
  }

  savePost() {
    this.error = null;
    this.postService.create(this.post).then(data => {
      this.ea.publish('post-updated');
      this.router.navigateToRoute('post-view', {slug: data.slug});
    }).catch(error => {
      this.error = error.message;
    });
  }

}
