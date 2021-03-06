import { inject } from "aurelia-framework";
import { PostService } from "../common/services/post-service";

@inject(PostService)
export class ArchiveView {
  constructor(PostService) {
    this.postService = PostService;
  }

  activate(params) {
    this.error = null;
    this.archive = params.archive;
    this.title = `Viewing post created in: ${this.archive}`;
    this.postService.postsByArchive(params.archive).then(data => {
      this.posts = data.posts;
    }).catch(error => {
      this.error = error.message;
    });
  }
}
