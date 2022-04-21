import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actor } from 'src/app/models/actor.model';
import { MovieResponse } from 'src/app/models/movie-response.model';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-add-actor',
  templateUrl: './add-actor.component.html',
  styleUrls: ['./add-actor.component.css']
})
export class AddActorComponent implements OnInit {

  actor: Actor = {
    actor_id: 0,
    age: 0,
    firstName: "",
    lastName: "",
    photoLink: "",
    movies: []
  };
  movie: MovieResponse;
  constructor(private movieService: MovieService, private router: Router, private actRouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.movieService
      .getById(this.actRouter.snapshot.params['movie_id'])
      .subscribe({
        next: (data) => {
          console.log(data);
          this.movie = data;
        },
        error: (err) => {
          console.error(err);
        },
      });
  }

  saveActor(): void {
    const data = {
      age: this.actor.age,
      firstName: this.actor.firstName,
      lastName: this.actor.lastName,
      photoLink: this.actor.photoLink,
      movies: this.actor.movies
    }

    this.movieService.createActor(data).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

}
