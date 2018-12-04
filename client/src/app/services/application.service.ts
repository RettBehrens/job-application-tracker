import { AuthenticationService, UserDetails } from './authentication.service';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ApplicationService {
  private apiUrl: string = environment.apiUrl;
  private application: any;

  constructor(
    private httpClient: HttpClient,
    private authenticationService: AuthenticationService
  ) {}

  public updateApplication(application: any): void {
    this.application = application;
  }

  public saveApplication(editing: boolean): Observable<any> {
    return editing ? this.putApplication(this.application) : this.postApplication(this.application);
  }

  private postApplication(application: any): Observable<any> {
    return this.request('post', 'application', application);
  }

  private putApplication(application: any): Observable<any> {
    return this.request('put', 'application', application);
  }

  private request(
    method: 'post' | 'put' | 'get' | 'delete',
    type: 'application',
    application: any
  ): Observable<any> {
    let base;

    if (method === 'post') {
      base = this.httpClient.post(`${this.apiUrl}/api/${type}`, application, {
        headers: {
          Authorization: `Bearer ${this.authenticationService.getToken()}`
        }
      });
    }

    const request = base.pipe(
      map((data: any) => {
        return data;
      })
    );
    return request;
  }
}
