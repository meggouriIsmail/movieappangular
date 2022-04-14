import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from 'src/app/models/movie.model';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})

export class AddMovieComponent implements OnInit {
  
  movie: Movie = {
    title: '',
    description: '',
    director: {
      name: '',
      phone: ''
    }
  }
  
  constructor(private movieService: MovieService, private router: Router) { }

  ngOnInit(): void {
  }

  saveMovie(): void {
    const data = {
      title: this.movie.title,
      description: this.movie.description,
      director: this.movie.director
    }
    this.movieService.create(data).subscribe(
      {
        next: (data) => {
          console.log(data);
          this.router.navigateByUrl("/movies");
        }, error: (err) => {
          console.error(err);
        }
      });
  }


}
