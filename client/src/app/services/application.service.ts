// angular imports
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

// service imports
import { AuthenticationService } from './authentication.service';

// environment import
import { environment } from './../../environments/environment.prod';

// rxjs imports
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class ApplicationService {
  private apiUrl: string = environment.apiUrl;
  private application: any;

  constructor(
    private authenticationService: AuthenticationService,
    private httpClient: HttpClient
  ) {}

  public updateApplication(application: any): void {
    this.application = application;
  }

  public fetchApplication(applicationId: string): Observable<any> {
    return this.request('get', 'application', null, applicationId);
  }

  public saveApplication(
    editing: boolean,
    applicationId?: string
  ): Observable<any> {
    return editing
      ? this.putApplication(this.application, applicationId)
      : this.postApplication(this.application);
  }

  private postApplication(application: any): Observable<any> {
    return this.request('post', 'application', application);
  }

  private putApplication(
    application: any,
    applicationId: string
  ): Observable<any> {
    return this.request('put', 'application', application, applicationId);
  }

  public deleteApplication(applicationId: string): Observable<any> {
    return this.request('delete', 'application', null, applicationId);
  }

  private request(
    method: 'post' | 'put' | 'get' | 'delete',
    type: 'application',
    application?: any,
    applicationId?: string
  ): Observable<any> {
    let base;

    if (method === 'post') {
      base = this.httpClient.post(`${this.apiUrl}/api/${type}`, application, {
        headers: {
          Authorization: `Bearer ${this.authenticationService.getToken()}`
        }
      });
    } else if (method === 'put') {
      base = this.httpClient.put(
        `${this.apiUrl}/api/${type}/${applicationId}`,
        application,
        {
          headers: {
            Authorization: `Bearer ${this.authenticationService.getToken()}`
          }
        }
      );
    } else if (method === 'delete') {
      base = this.httpClient.delete(
        `${this.apiUrl}/api/${type}/${applicationId}`,
        {
          headers: {
            Authorization: `Bearer ${this.authenticationService.getToken()}`
          }
        }
      );
    } else if (method === 'get') {
      base = this.httpClient.get(
        `${this.apiUrl}/api/${type}/${applicationId}`,
        {
          headers: {
            Authorization: `Bearer ${this.authenticationService.getToken()}`
          }
        }
      );
    }

    const request = base.pipe(
      map((data: any) => {
        return data;
      })
    );
    return request;
  }
}
