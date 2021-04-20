import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { Router } from 'aurelia-router';
import { AuthService } from '../common/services/auth-service';

@inject(EventAggregator, Router, AuthService)
export class Signup {
  constructor(EventAggregator, Router, AuthService) {
    this.ea = EventAggregator;
    this.router = Router;
    this.authService = AuthService;
    this.userName = '';
    this.error = null;
  }
  
  signup() {
    this.error = null;
    this.authService.signup(this.userName).then(data => {
      this.ea.publish('userName', data.user);
      this.router.navigateToRoute('home');
    }).catch(error => {
      this.error = error.message;
    });
  }
}
