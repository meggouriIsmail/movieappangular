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
  
  id = this.actRouter.snapshot.params['movie_id'];

  ngOnInit(): void {
    this.movieService
      .getById(this.id)
      .subscribe({
        next: (data) => {
          this.movie = data;
        },
        error: (err) => {
          console.error(err);
        },
      });
  }

  saveActor(): void {
    const mv = {
      id:this.id,
      title: this.movie.title,
      description: this.movie.description,
      director: this.movie.director,
      actors: this.movie.actors
    }
    const data = {
      age: this.actor.age,
      firstName: this.actor.firstName,
      lastName: this.actor.lastName,
      photoLink: this.actor.photoLink,
      movies: [mv]
    }

    this.movieService.createActor(data).subscribe({
      next: (data) => {
        data;
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  this.router.onSameUrlNavigation = 'reload';
  this.router.navigate(['./'], { relativeTo: this.actRouter });
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

}
