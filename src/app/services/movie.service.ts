import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieHome } from '../models/movie-home.model';
import { MovieResponse } from '../models/movie-response.model';
import { Movie } from '../models/movie.model';

const baseUrl = 'http://localhost:8080/api/movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Movie[]> {
    return this.httpClient.get<Movie[]>(baseUrl);
  }

  getAllHome(): Observable<MovieHome[]> {
    return this.httpClient.get<MovieHome[]>(`${baseUrl}/home`);
  }
  
  getById(movie_id: number): Observable<MovieResponse> {
    return this.httpClient.get<MovieResponse>(`${baseUrl}/${movie_id}`);
  }

  create(data: any): Observable<any> {
    return this.httpClient.post(`${baseUrl}/add`, data);
  }

  uploadImage(file: File, movie_id: number, is_cover: boolean): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('is_cover', (is_cover) ? '1' : '0');

    const req = new HttpRequest('POST', `${baseUrl}/uploadFile/${movie_id}`, formData, {
      responseType: 'json'
    });
    return this.httpClient.request(req);
  }
}
