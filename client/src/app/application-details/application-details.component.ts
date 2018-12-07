// angular imports
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  FormGroupDirective,
  NgForm
} from '@angular/forms';

// service imports
import { ApplicationService } from './../services/application.service';

// rxjs imports
import { take, takeWhile } from 'rxjs/operators';

export class ApplicationErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-application-details',
  templateUrl: './application-details.component.html',
  styleUrls: ['./application-details.component.scss']
})
export class ApplicationDetailsComponent
  implements AfterViewInit, OnInit, OnDestroy {
  public applicationFormGroup: FormGroup;
  private applicationFormGroupValues: any;
  private applicationFormGroupKeys: string[];
  private applicationFormGroupValid: boolean = false;
  public statusOptions: any[] = [
    { value: 0, viewValue: 'Applied' },
    { value: 1, viewValue: 'Interviewing' },
    { value: 2, viewValue: 'Rejected' },
    { value: 3, viewValue: 'Hired' }
  ];
  public editing: boolean = false;
  private applicationId: string;
  public applicationErrorMessage: string;
  private componentAlive: boolean = true;

  public matcher = new ApplicationErrorStateMatcher();

  constructor(
    private activatedRoute: ActivatedRoute,
    private applicationService: ApplicationService,
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
        .pipe(take(1))
        .subscribe((application: any) => {
          Object.keys(this.applicationFormGroup.controls).forEach(key => {
            this.applicationFormGroup.controls[key].setValue(application[key]);
          });
        });
    }
  }

  ngOnDestroy() {
    this.componentAlive = false;
  }

  private initializeFormGroup(): void {
    this.applicationFormGroup = this.formBuilder.group({
      company: ['', Validators.required],
      position_applied_for: ['', Validators.required],
      date_applied: ['', Validators.required],
      contact_name: [''],
      contact_position: [''],
      contact_phone: [''],
      contact_email: ['', Validators.email],
      most_recent_follow_up_date: [''],
      number_of_follow_ups: [0],
      status: [0]
    });

    this.applicationFormGroupKeys = Object.keys(
      this.applicationFormGroup.controls
    );
  }

  private applicationFormGroupValueChanges(): void {
    this.applicationFormGroup.valueChanges
      .pipe(takeWhile((componentAlive: boolean) => this.componentAlive))
      .subscribe((applicationFormGroupValues: any) => {
        this.applicationFormGroupValues = applicationFormGroupValues;
        this.applicationFormGroupValid = this.applicationFormGroup.valid;
        this.applicationService.updateApplication(
          this.applicationFormGroupValues
        );
      });
  }

  public onSubmit(): void {
    if (this.applicationFormGroupValid) {
      this.applicationService
        .saveApplication(this.editing, this.applicationId)
        .pipe(take(1))
        .subscribe((data: any) => {
          if (data.errors) {
            console.log(data.errors);
          } else {
            this.router.navigateByUrl('/profile');
          }
        });
    } else {
      this.applicationFormGroupKeys.forEach((key: string) => {
        this.applicationFormGroup.controls[key].markAsTouched();
      });
    }
  }
}
