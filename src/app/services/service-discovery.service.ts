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
export class ServiceDiscoveryService {

  private SERVICE_DISCOVERY_API_URL= environment.SERVICE_DISCOVERY_API_URL;

  constructor(private http: HttpClient) { }

  getServiceDiscovery(): Observable<any[]> {
    return this.http.get<any[]>(this.SERVICE_DISCOVERY_API_URL + '/api/service-discovery', httpOptions);
  }

  refreshModuleState(moduleName:any): Observable<any> {
    return this.http.get<any>(this.SERVICE_DISCOVERY_API_URL + '/api/service-discovery/refresh?moduleName='+moduleName, httpOptions);
  }

  filterServiceDiscovery(query:any): Observable<any[]> {
    return this.http.get<any[]>(this.SERVICE_DISCOVERY_API_URL + '/api/service-discovery/search?moduleName='+query, httpOptions);
  }

  getConfigurationJson(moduleName:any): Observable<Blob> {
    return this.http.get(this.SERVICE_DISCOVERY_API_URL + '/api/configuration/export/search?moduleName='+moduleName, {
      responseType: 'blob'
    })
  }
}
