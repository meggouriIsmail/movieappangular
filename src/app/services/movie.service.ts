import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Actor } from '../models/actor.model';
import { Categorie } from '../models/categorie.model';
import { MovieHome } from '../models/movie-home.model';
import { MovieResponse } from '../models/movie-response.model';
import { Movie } from '../models/movie.model';

const baseUrl = 'http://localhost:8080/api';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Movie[]> {
    return this.httpClient.get<Movie[]>(`${baseUrl}/movie`);
  }

  getAllActors(): Observable<Actor[]> {
    return this.httpClient.get<Actor[]>(`${baseUrl}/actors`);
  }

  getAllCategories(): Observable<Categorie[]> {
    return this.httpClient.get<Categorie[]>(`${baseUrl}/categories`);
  }

  getAllHome(): Observable<MovieHome[]> {
    return this.httpClient.get<MovieHome[]>(`${baseUrl}/movie/home`);
  }
  
  getById(movie_id: number): Observable<MovieResponse> {
    return this.httpClient.get<MovieResponse>(`${baseUrl}/movie/${movie_id}`);
  }

  create(data: any): Observable<any> {
    return this.httpClient.post(`${baseUrl}/movie/add`, data);
  }

  update(data: any, movie_id: number):  Observable<HttpEvent<any>> {
    return this.httpClient.put<HttpEvent<any>>(`${baseUrl}/movie/update/${movie_id}`, data);
  }

  delete(movie_id: number):  Observable<HttpEvent<any>> {
    return this.httpClient.delete<HttpEvent<any>>(`${baseUrl}/movie/${movie_id}`);
  }

  uploadImage(file: File, movie_id: number, is_cover: boolean): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('is_cover', (is_cover) ? '1' : '0');

    const req = new HttpRequest('POST', `${baseUrl}/movie/uploadFile/${movie_id}`, formData, {
      responseType: 'json'
    });
    return this.httpClient.request(req);
  }
}
