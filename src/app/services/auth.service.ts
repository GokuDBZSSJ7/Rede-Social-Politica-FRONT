import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/api/';

  constructor(private http: HttpClient) {}

  register(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}register`, data);
  }

  login(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}auth/login`, data).pipe(
        tap(response => {
            localStorage.setItem('authToken', response.access_token);
            localStorage.setItem('user', JSON.stringify(response.user));
        })
    );
}

logout() {
  return this.http.post<any>(`${this.apiUrl}/auth/logout`, {}).subscribe(() => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    // this.router.navigate(['/login']);
  });
}
refresh(): Observable<any> {
  return this.http.post<any>(`${this.apiUrl}auth/refresh`, {});
}

  getUser(): any {
    const userString = localStorage.getItem('user');
    return userString ? JSON.parse(userString) : null;
  }

  destroyToken() {
    localStorage.removeItem('authToken');
  }

  setToken(token: any, rememberMe: boolean) {
    const jwt: any = jwtDecode(token.access_token)
    const expires = new Date(jwt['exp'] * 1000);
    token = { ...token, expires, rememberMe };
    if (rememberMe) {
      localStorage.setItem('authToken', JSON.stringify(token));
    } else {
      localStorage.setItem('authToken', JSON.stringify(token));
    }
  }

  me(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}auth/me`, {});
  }

  setUser(): Observable<any> {
    return this.me().pipe(
      tap(user => localStorage.setItem('user', JSON.stringify(user))),
      catchError(() => of(null))
    );
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  fetchUserInfo(): Observable<any> {
    const token = this.getToken();
    if (!token) {
      throw new Error('No token found');
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<any>(`${this.apiUrl}me`, { headers }).pipe(
      tap(user => {
        localStorage.setItem('user', JSON.stringify(user));
      })
    );
  }
}