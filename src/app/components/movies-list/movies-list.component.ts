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
    const params = this.getParams(this.page, this.pageSize, this.searchTitle);
    this.movieService.getAllPagination(params).subscribe(
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
