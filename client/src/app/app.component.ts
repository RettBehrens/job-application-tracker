// angular imports
import { Component } from '@angular/core';

// service imports
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    public authenticationService: AuthenticationService
  ) { }
}
