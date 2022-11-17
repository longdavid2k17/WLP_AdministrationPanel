import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class MailService {

  private MAILING_MODULE_API_URL = environment.MAILING_MODULE_API_URL;

  constructor(private http: HttpClient) { }

  sendMessage(formValue:any):Observable<any> {
    return this.http.post(this.MAILING_MODULE_API_URL + '/api/mailing', formValue, httpOptions);
  }
  sendHTMLMessage(formValue:any):Observable<any> {
    return this.http.post(this.MAILING_MODULE_API_URL + '/api/mailing/html', formValue, httpOptions);
  }
}
