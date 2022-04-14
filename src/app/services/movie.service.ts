import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../models/movie.model';

const baseUrl = 'http://localhost:8080/api/movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private client: HttpClient) { }

  getAll(): Observable<Movie[]> {
    return this.client.get<Movie[]>(baseUrl);
  }

  create(data: any): Observable<any> {
    return this.client.post(`${baseUrl}/add`, data);
  }

}
