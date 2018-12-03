import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ApplicationService {

  private apiUrl: string = environment.apiUrl;
  private userDetails: any;

  constructor(
    private httpClient: HttpClient
  ) { }

  public setUserDetails(userDetails: any): void {
    this.userDetails = userDetails;
  }
}
