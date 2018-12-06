import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  FormGroupDirective,
  NgForm
} from '@angular/forms';
import {
  AuthenticationService,
  TokenPayload
} from '../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorStateMatcher } from '@angular/material/core';

export class LoginErrorStateMatcher implements ErrorStateMatcher {
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
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginFormGroup: FormGroup;
  private loginFormGroupValues: TokenPayload;
  private loginFormGroupKeys: string[];
  private loginFormGroupValid: boolean = false;
  public loginErrorMessage: string;

  public matcher = new LoginErrorStateMatcher();

  constructor(
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.initializeFormGroup();
    this.loginFormGroupValueChanges();
  }

  private initializeFormGroup(): void {
    this.loginFormGroup = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: [
        '',
        Validators.compose([Validators.required, Validators.minLength(6)])
      ]
    });

    this.loginFormGroupKeys = Object.keys(this.loginFormGroup.controls);
  }

  private loginFormGroupValueChanges(): void {
    this.loginFormGroup.valueChanges.subscribe(
      (loginFormGroupValues: TokenPayload) => {
        this.loginFormGroupValues = loginFormGroupValues;
        this.loginFormGroupValid = this.loginFormGroup.valid;
      }
    );
  }

  public login() {
    if (this.loginFormGroupValid) {
      this.authenticationService.login(this.loginFormGroupValues).subscribe(
        (data: any) => {
          if (data.token) {
            this.router.navigateByUrl('/profile');
          }
        },
        (err: any) => {
          this.loginErrorMessage = err.error.message;
          alert(this.loginErrorMessage);
          console.log(err);
        }
      );
    } else {
      this.loginFormGroupKeys.forEach((key: string) => {
        this.loginFormGroup.controls[key].markAsTouched();
      });
    }
  }
}
