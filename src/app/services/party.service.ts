import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PartyService {
  private apiUrl = 'http://127.0.0.1:8000/api/';

  constructor(private http: HttpClient) { }

  list(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}party`);
  }

  filterPendentsCandidates(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}filterPendentsCandidates`);
  }

  filterApprovedCandidates(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}filterApprovedCandidates`);
  }

  create(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}party`, data)
  }

  approveCandidate(id: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}approveCandidate/${id}`, id)
  }

}