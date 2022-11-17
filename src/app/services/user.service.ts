import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private AUTHORIZATION_API_URL= environment.AUTH_API_URL;

  constructor(private http: HttpClient) { }

  listUsers(roles?:any):Observable<any[]> {
    let roleParam = {};
    if(roles) roleParam = {roles:roles}
    return this.http.get<any[]>(this.AUTHORIZATION_API_URL
      +"/api/user/all",{
        params:roleParam,
      })
      httpOptions;
    }

    getStats():Observable<any[]> {
      return this.http.get<any[]>(this.AUTHORIZATION_API_URL
        +"/api/user/stats",
        httpOptions);
    }

    editUserData(formValue:any):Observable<any> {
      return this.http.put<any>(this.AUTHORIZATION_API_URL
        +"/api/user/edit",
        formValue,
        httpOptions);
    }
}
