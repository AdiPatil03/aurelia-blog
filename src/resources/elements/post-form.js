import {inject, bindable} from 'aurelia-framework';
import { ValidationRules, ValidationControllerFactory, validationMessages } from 'aurelia-validation'; 
import { PostService } from '../../common/services/post-service';

@inject(PostService, ValidationControllerFactory)
export class PostForm {
  @bindable post;
  @bindable title;

  constructor(PostService, ValidationControllerFactory) {
    this.postService = PostService;
    this.controller = ValidationControllerFactory.createForCurrentScope();
    this.error = null;

  }

  attached() {
    this.getTags();
  }

  postChanged(newValue, oldValue) {
    if (this.post) {

      validationMessages['required'] = `You must enter a \${$displayName}`;

      ValidationRules
        .ensure('title').displayName('Title').required().minLength(5)
        .ensure('body').displayName('Body').required()
        .on(this.post);
      // ValidationRules
      //   .ensure('title').required().withMessage('You must enter a Title')
      //   .ensure('body').required().withMessage('You must have a Body')
      //   .on(this.post);

      this.controller.validate();
    }
  }

  getTags() {
    this.error = null;
    this.postService.allTags().then(data => {
      this.allTags = data.tags;
    }).catch(error => {
      this.error = error.message;
    });
  }

  addTag() {
    this.allTags.push(this.newTag);
    this.post.tags.push(this.newTag);
    this.newTag = '';
  }
}
