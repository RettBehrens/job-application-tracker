// angular imports
import { Component } from '@angular/core';

// service imports
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(
    public authenticationService: AuthenticationService
  ) { }
}
