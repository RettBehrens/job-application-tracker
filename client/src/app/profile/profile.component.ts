// angular imports
import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataSource } from '@angular/cdk/table';
import { Router } from '@angular/router';

// service imports
import { ApplicationService } from '../services/application.service';
import { AuthenticationService } from '../services/authentication.service';

// rxjs imports
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
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
  private componentAlive: boolean = true;

  constructor(
    private applicationService: ApplicationService,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authenticationService.profile()
    .pipe(take(1))
    .subscribe(
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

  ngOnDestroy() {
    this.componentAlive = false;
  }

  onClickEdit(applicationId: string): void {
    this.router.navigateByUrl(`/details/${applicationId}`);
  }

  onClickDelete(applicationId: string): void {
    this.applicationService
      .deleteApplication(applicationId)
      .pipe(take(1))
      .subscribe((data: any) => {
        console.log(data);
        this.dataSource = this.dataSource.filter((application: any) => {
          return application._id !== applicationId;
        });
      });
  }
}
