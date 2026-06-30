import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface SugerenciaComunidad {
  userId: number;
  id: number;
  title: string;
  body: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private API_URL = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) { }

  obtenerSugerencias(): Observable<SugerenciaComunidad[]> {
    return this.http.get<SugerenciaComunidad[]>(this.API_URL);
  }
}