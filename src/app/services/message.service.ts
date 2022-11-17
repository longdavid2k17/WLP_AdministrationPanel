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
export class MessageService {

  private MAILING_MODULE_API_URL = environment.MAILING_MODULE_API_URL;

  constructor(private http: HttpClient) { }

  getAllSentMessages(): Observable<any[]>{
    return this.http.get<any[]>(this.MAILING_MODULE_API_URL+'/api/message',httpOptions);
  }

  getAllInboxMessages(): Observable<any[]>{
    return this.http.get<any[]>(this.MAILING_MODULE_API_URL+'/api/message/inbox',httpOptions);
  }
}
