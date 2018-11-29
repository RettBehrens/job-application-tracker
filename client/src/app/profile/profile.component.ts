import { UserDetails, AuthenticationService } from './../authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  details: UserDetails;

  constructor(
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.authenticationService.profile().subscribe((user: UserDetails) => {
      this.details = user;
    }, (err) => {
      console.log(err);
    });
  }
}
