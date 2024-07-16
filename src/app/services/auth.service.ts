import { Injectable } from '@angular/core';
import { HttpUtils } from '../http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private utils: HttpUtils,
    private http: HttpClient
  ) { }

  login(data: any): Observable<any> {
    return this.http.post<any>(`${this.utils.apiUrl}auth/login`, data);
  }
}