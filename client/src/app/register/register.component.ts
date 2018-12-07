// angular imports
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';

// service imports
import {
  AuthenticationService,
  TokenPayload
} from '../services/authentication.service';

export class RegisterErrorStateMatcher implements ErrorStateMatcher {
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
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public registerFormGroup: FormGroup;
  private registerFormGroupValues: TokenPayload;
  private registerFormGroupKeys: string[];
  private registerFormGroupValid: boolean = false;
  public registerErrorMessage: string;

  public matcher = new RegisterErrorStateMatcher();

  constructor(
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.initializeFormGroup();
    this.registerFormGroupValueChanges();
  }

  private initializeFormGroup(): void {
    this.registerFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: [
        '',
        Validators.compose([Validators.required, Validators.minLength(6)])
      ]
    });

    this.registerFormGroupKeys = Object.keys(this.registerFormGroup.controls);
  }

  private registerFormGroupValueChanges(): void {
    this.registerFormGroup.valueChanges.subscribe(
      (registerFormGroupValues: TokenPayload) => {
        this.registerFormGroupValues = registerFormGroupValues;
        this.registerFormGroupValid = this.registerFormGroup.valid;
      }
    );
  }

  public register() {
    if (this.registerFormGroupValid) {
      this.authenticationService
        .register(this.registerFormGroupValues)
        .subscribe(
          (data: any) => {
            if (data.token) {
              this.router.navigateByUrl('/profile');
            }
          },
          (err: any) => {
            this.registerErrorMessage = err.error.errmsg;
            alert(this.registerErrorMessage);
            console.log(err);
          }
        );
    } else {
      this.registerFormGroupKeys.forEach((key: string) => {
        this.registerFormGroup.controls[key].markAsTouched();
      });
    }
  }
}
