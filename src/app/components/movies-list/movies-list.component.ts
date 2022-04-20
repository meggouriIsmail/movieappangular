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
  id:number;
  constructor(private movieService: MovieService, private router: Router) { }

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

  deleteHelper(movie_id: number, event: Event): void{
    event.preventDefault()
    document.getElementById('id01').style.display='block';
    this.id=movie_id
  }

  delete(): void{
    this.movieService.delete(this.id).subscribe({
      next:(data)=>{
        this.ngOnInit();
        console.log("data");
      },
      error: err => {console.error(err);}
    })
    document.getElementById('id01').style.display='none';
  }
}
