import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationService } from './../services/application.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-application-details',
  templateUrl: './application-details.component.html',
  styleUrls: ['./application-details.component.scss']
})
export class ApplicationDetailsComponent implements AfterViewInit, OnInit {
  public applicationFormGroup: FormGroup;
  private applicationFormGroupValues: any;
  public statusOptions: any[] = [
    { value: 0, viewValue: 'Applied' },
    { value: 1, viewValue: 'Interviewing' },
    { value: 2, viewValue: 'Rejected' },
    { value: 3, viewValue: 'Hired' }
  ];
  public editing: boolean = false;
  private applicationId: string;

  constructor(
    private applicationService: ApplicationService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.initializeFormGroup();
    this.applicationFormGroupValueChanges();

    this.activatedRoute.paramMap.pipe(take(1)).subscribe(params => {
      if (params.get('id')) {
        this.editing = true;
        this.applicationId = params.get('id');
      }
    });
  }

  ngAfterViewInit() {
    if (
      this.editing &&
      this.applicationId !== null &&
      this.applicationId !== undefined
    ) {
      this.applicationService
        .fetchApplication(this.applicationId)
        .subscribe((application: any) => {
          Object.keys(this.applicationFormGroup.controls).forEach(key => {
            this.applicationFormGroup.controls[key].setValue(application[key]);
          });
        });
    }
  }

  private initializeFormGroup(): void {
    this.applicationFormGroup = this.formBuilder.group({
      company: ['', Validators.required],
      position_applied_for: ['', Validators.required],
      date_applied: ['', Validators.required],
      contact_name: [''],
      contact_position: [''],
      contact_phone: [''],
      contact_email: [''],
      most_recent_follow_up_date: [''],
      number_of_follow_ups: [0],
      status: [0]
    });
  }

  private applicationFormGroupValueChanges(): void {
    this.applicationFormGroup.valueChanges.subscribe(
      (applicationFormGroupValues: any) => {
        this.applicationFormGroupValues = applicationFormGroupValues;
        this.applicationService.updateApplication(
          this.applicationFormGroupValues
        );
      }
    );
  }

  public onSubmit(): void {
    this.applicationService
      .saveApplication(this.editing, this.applicationId)
      .subscribe((data: any) => {
        if (data.errors) {
          console.log(data.errors);
        } else {
          this.router.navigateByUrl('/profile');
        }
      });
  }
}
