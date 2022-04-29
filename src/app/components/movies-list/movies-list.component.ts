import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieHome } from 'src/app/models/movie-home.model';
import { Movie } from 'src/app/models/movie.model';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css']
})
export class MoviesListComponent implements OnInit {

  movies?: MovieHome[];
  id: number;
  searchTitle = "";
  page = 1;
  count = 0;
  pageSize = 4;

  constructor(private movieService: MovieService, private router: Router) { }

  ngOnInit(): void {
    this.getAllMovies();
  }

  getAllMovies(): void {
    var t = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJscWtEQ2xGMUp3dTQ1cUJQdERHZ0wtS2l6TXdERDZxRl9tYklKTEptY1UwIn0.eyJleHAiOjE2NTEyNDM4MTIsImlhdCI6MTY1MTI0MzUxMiwianRpIjoiZGE4ZjUzN2EtMTE1MS00MTBiLTgxZDgtZTMxYWNkMjFmMWExIiwiaXNzIjoiaHR0cDovLzEwMi41My4xNS4xMzQ6ODA4NS9hdXRoL3JlYWxtcy9tb3ZpZV9hcHBsaWNhdGlvbiIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiI4OGU2MjE3My02NmIxLTQzNTMtYjJiYi1lNTg2YjBjNDk1YmQiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJzcHJpbmdfYmFja2VuZF9tZWdnb3VyaSIsInNlc3Npb25fc3RhdGUiOiIwN2NiOTE0Yy00NGZjLTQyYzQtYTRkZi1mNWExNjIxYzgwZmQiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbIioiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIlJPTEVfVVNFUiIsIm9mZmxpbmVfYWNjZXNzIiwiZGVmYXVsdC1yb2xlcy1tb3ZpZV9hcHBsaWNhdGlvbiIsIlJPTEVfQURNSU4iLCJST0xFX01PREVSQVRPUiIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCIsInNpZCI6IjA3Y2I5MTRjLTQ0ZmMtNDJjNC1hNGRmLWY1YTE2MjFjODBmZCIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwibmFtZSI6ImlzbWFpbCBtZWdnb3VyaSIsInByZWZlcnJlZF91c2VybmFtZSI6Im1lZ2dvdXJpIiwiZ2l2ZW5fbmFtZSI6ImlzbWFpbCIsImZhbWlseV9uYW1lIjoibWVnZ291cmkiLCJlbWFpbCI6ImkubWVnZ291cmlAZ21haWwuY29tIn0.R4fvmOscWi5nMCgeLLryTaWWf-P1PyFigUVTsreRwq6yRkz9RlVDj3qT6yH1exJ5TGm8AXkDXT3wxAy243Y152_PhMEjldB_u3snG6DtZhgTbSF58plIoPKBqfXblhwyi_ipT3xZL7Dk38rNJU6y9jGd6g-y35iyAc59j4g02mts9B9lO0cdTQMp7vmbaL2R3NgS-pRdiCitgdYJVZtaGMPLaNoqdBrGbAQXLCEquxUtw5aBy5YDNqAzzS71-H2iUAzj9R2PWXsJXFZfgkxiegw9eZGdVnql-D88xtXsOLPnS0PdQWGL07Y5atkhMK09O--tILQbEwl5YLCe367XPQ";
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + t);
    const params = this.getParams(this.page, this.pageSize, this.searchTitle);
    this.movieService.getAllPagination(params, headers_object).subscribe(
      {
        next: (data) => {
          console.log(data);
          const { content, totalElements } = data;
          this.movies = content;
          this.count = totalElements;
        }, error: (err) => {
          console.error(err);
        }
      }
    );
  }

  pageChanged(event: any): void {
    this.page = event;
    this.getAllMovies();
  }

  getParams(page: number, pageSize: number, title: string) {
    let params: any = {};
    if (page) {
      params['page'] = page - 1;
    }
    if (pageSize) {
      params['size'] = pageSize;
    }
    if (title) {
      params['title'] = title;
    }

    return params;
  }

  deleteHelper(movie_id: number, event: Event): void {
    event.preventDefault()
    document.getElementById('id01').style.display = 'block';
    this.id = movie_id
  }

  delete(): void {
    this.movieService.delete(this.id).subscribe({
      next: (data) => {
        this.ngOnInit();
        console.log("data");
      },
      error: err => { console.error(err); }
    })
    document.getElementById('id01').style.display = 'none';
  }
}
