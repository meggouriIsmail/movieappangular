import { Component, OnInit } from '@angular/core';
import { MovieHome } from 'src/app/models/movie-home.model';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css']
})
export class MoviesListComponent implements OnInit {
  
  movies?: MovieHome[];
  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.getAllMovies();
  }

  getAllMovies(): void {
    this.movieService.getAllHome().subscribe(
      {
        next: (data) => {
          console.log(data);
          this.movies = data;
        }, error: (err) => {
          console.error(err);
        }
      }
    );
  }

}
