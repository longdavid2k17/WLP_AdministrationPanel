import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private AUTHORIZATION_API_URL= environment.AUTH_API_URL;

  constructor(private http: HttpClient) { }

  listRoles(roles?:any[]):Observable<any[]> {
    return this.http.get<any[]>(this.AUTHORIZATION_API_URL
      +"/api/role/all",
      httpOptions);
  }

  grantRoles(payload:any):Observable<any> {
    return this.http.post<any[]>(this.AUTHORIZATION_API_URL
      +"/api/user/management/grant-roles",
      payload,
      httpOptions);
  }
}
