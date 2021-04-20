import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { Router } from 'aurelia-router';
import { AuthService } from '../common/services/auth-service';

@inject(EventAggregator, AuthService, Router)
export class Login {
  constructor(EventAggregator, AuthService, Router) {
    this.ea = EventAggregator;
    this.authService = AuthService;
    this.router = Router;
    this.error = null;
  }

  login() {
    this.error = null;
    this.authService.login(this.userName).then(data => {
      this.ea.publish('userName', data.user);
      this.router.navigateToRoute('home');
      sessionStorage.setItem('userName', data.user);
    }).catch(error => {
      this.error = error.message;
    });
  }
}
