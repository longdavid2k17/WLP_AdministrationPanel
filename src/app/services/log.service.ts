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
export class LogService {

  private SERVICE_DISCOVERY_API_URL= environment.SERVICE_DISCOVERY_API_URL;

  constructor(private http: HttpClient) { }

  listLogFiles(moduleName:any):Observable<any[]> {
    return this.http.get<any[]>(this.SERVICE_DISCOVERY_API_URL
      +"/api/log/get-all?moduleName="+moduleName,
      httpOptions);
  }

  readLogFile(moduleName:any,filePath:any):Observable<any> {
    return this.http.get<any>(this.SERVICE_DISCOVERY_API_URL
      +"/api/log/read-file?moduleName="+moduleName+"&fileName="+filePath,
      httpOptions);
  }
}
