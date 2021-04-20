import {bindable} from 'aurelia-framework';

export class BlogPost {
  @bindable value;

  valueChanged(newValue, oldValue) {
    //
  }
}
