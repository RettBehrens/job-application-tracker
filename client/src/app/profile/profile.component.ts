// angular imports
import { Component, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/table';
import { Router } from '@angular/router';

// service imports
import { ApplicationService } from '../services/application.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public userDetails: any;
  public dataSource: any[];
  public displayedColumns: string[] = [
    'company',
    'position_applied_for',
    'date_applied',
    'most_recent_follow_up_date',
    'status',
    'edit',
    'delete'
  ];
  private statusOptions: any = {
    0: 'Applied',
    1: 'Interviewing',
    2: 'Rejected',
    3: 'Hired'
  };
  public loading: boolean = true;

  constructor(
    private applicationService: ApplicationService,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authenticationService.profile().subscribe(
      (user: any) => {
        this.userDetails = user;
        this.dataSource = user.applications;
        this.dataSource.forEach((application: any) => {
          application.status = this.statusOptions[application.status];
        });
        this.loading = false;
      },
      err => {
        console.log(err);
      }
    );
  }

  onClickEdit(applicationId: string): void {
    this.router.navigateByUrl(`/details/${applicationId}`);
  }

  onClickDelete(applicationId: string): void {
    this.dataSource = this.dataSource.filter((application: any) => {
      return application._id !== applicationId;
    });

    this.applicationService
      .deleteApplication(applicationId)
      .subscribe((data: any) => {
        console.log(data);
      });
  }
}
