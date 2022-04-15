import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieResponse } from 'src/app/models/movie-response.model';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

  movie?: MovieResponse;
  
  constructor(private movieService: MovieService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.movieService.getById(this.route.snapshot.params["movie_id"]).subscribe(
      {
        next: (data) => {
          console.log(data);
          this.movie = data;
        }, error: (err) => {
          console.error(err);
        }
      }
    );
    console.log(this.route.snapshot.params["movie_id"]);
    
  }

}
