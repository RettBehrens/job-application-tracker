import { AuthenticationService } from '../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { ApplicationService } from '../services/application.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public userDetails: any;

  constructor(
    private authenticationService: AuthenticationService,
    private applicationService: ApplicationService
  ) { }

  ngOnInit() {
    this.authenticationService.profile().subscribe((user: any) => {
      this.userDetails = user;
      this.applicationService.setUserDetails(this.userDetails);
    }, (err) => {
      console.log(err);
    });
  }
}
