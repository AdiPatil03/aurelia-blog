import { inject } from "aurelia-framework";
import { PostService } from "../common/services/post-service";
import { AuthService } from '../common/services/auth-service';

@inject(PostService, AuthService)
export class View {
  constructor(PostService, AuthService) {
    this.postService = PostService;
    this.authService = AuthService;
    this.post={
      slug: ''
    };
  }

  attached() {
    this.currentUser = sessionStorage.getItem('userName');
  }

  activate(params) {
    this.error = '';
    this.postService.find(params.slug).then(data => {
      this.post = data.post;
    }).catch(error => {
      this.error = error.message;
    });
  }
}
