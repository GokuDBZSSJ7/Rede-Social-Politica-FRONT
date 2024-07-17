import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpUtils } from '../http';
import { FileUploaderOptions } from 'ng2-file-upload';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export abstract class HttpRestfulService {

  protected endpoint: string;

  protected constructor(
    @Inject('endpoint') endpoint: string,
    protected http: HttpClient,
    protected utils: HttpUtils,
  ) {
    this.endpoint = endpoint;
  }

  list(): Observable<any> {
    return this.http.get<any>(`${this.utils.apiUrl}${this.endpoint}`);
  }

  get(id: number): Observable<any> {
    return this.http.get<any>(`${this.utils.apiUrl}${this.endpoint}/${id}`);
  }

  new(data: any): Observable<any> {
    return this.http.post<any>(`${this.utils.apiUrl}${this.endpoint}`, data);
  }

  update(data: any): Observable<any> {
    if (data instanceof FormData) {
      data.set('_method', 'PUT');
      const id = data.get('id');

      return this.http.post<any>(`${this.utils.apiUrl}${this.endpoint}/${id}`, data);
    }

    return this.http.put<any>(`${this.utils.apiUrl}${this.endpoint}/${data.id}`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.utils.apiUrl}${this.endpoint}/${id}`);
  }

  search(endpoint: string, data: any): Observable<any> {
    return this.http.get<any>(`${this.utils.apiUrl}${endpoint}?description=${data}`);
  }

  getFileUploaderOptions(options: FileUploaderOptions = {}): FileUploaderOptions {
    return this.utils.getFileUploaderOptions(options);
  }
}