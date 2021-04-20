import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { Router } from 'aurelia-router';
import { PostService } from '../common/services/post-service';
import { AuthService } from '../common/services/auth-service';

@inject(EventAggregator, Router, PostService, AuthService)
export class Edit {

  constructor(EventAggregator, Router, PostService, AuthService) {
    this.ea = EventAggregator;
    this.router = Router;
    this.postService = PostService;
    this.authService = AuthService;
    this.error = null;
  }

  activate(params){
    this.error = '';
    this.postService.find(params.slug).then(data => {
      this.post = data.post;
    }).catch(error => {
      this.error = error.message;
    });
  }

  attached() {
    this.title = 'Edit Post';
  }

  updatePost() {
    this.error = null;
    this.postService.update(this.post).then(data => {
      this.ea.publish('post-updated');
      this.router.navigateToRoute('post-view', {slug: data.slug});
    }).catch(error => {
      this.error = error.message;
    });
  }

}
