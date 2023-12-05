import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { register } from './register';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private http: HttpClient) { }  
  
  public saveUser(user: register): Observable<any> {
    const url = '/home';
    return this.http.post<any>(url, user);
  }
}
