import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-application-details',
  templateUrl: './application-details.component.html',
  styleUrls: ['./application-details.component.scss']
})
export class ApplicationDetailsComponent implements OnInit {
  public formGroup: FormGroup;
  private formGroupValues: any;
  private formGroupKeys: any;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      company: ['', Validators.required],
      position_applied_for: ['', Validators.required],
      date_applied: [null, Validators.required],
      contact_name: [''],
      contact_position: [''],
      contact_phone: [''],
      contact_email: [''],
      most_recent_follow_up_date: [null],
      number_of_follow_ups: [null],
      status: ['']
    });
    console.log(this.formGroup);
  }
}
