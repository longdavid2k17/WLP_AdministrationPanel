import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  private AUTH_API_URL= environment.AUTH_API_URL;

  constructor(private http: HttpClient) { }

  logUser(formVal:any): Observable<any> {
    return this.http.post(this.AUTH_API_URL + '/authorization/sign-in', formVal, httpOptions);
  }

  logout(): Observable<any> {
    return this.http.put(this.AUTH_API_URL + '/authorization/log-out', httpOptions);
  }

  disableAccount(userId:any, deactivationReason:any):Observable<any> {
    return this.http.put(this.AUTH_API_URL + '/authorization/deactivate',
    {},{
      params: {
      userId:userId, deactivationReason:deactivationReason}
    });
  }
}
