import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Actor } from 'src/app/models/actor.model';
import { Categorie } from 'src/app/models/categorie.model';
import { MovieResponse } from 'src/app/models/movie-response.model';
import { Movie } from 'src/app/models/movie.model';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css'],
})
export class AddMovieComponent implements OnInit {
  movieCover: File | null = null;
  coverPreview: string = 'https://via.placeholder.com/200';
  actor: Actor = {
    actor_id: 0,
    age: 0,
    firstName: "",
    lastName: "",
    photoLink: "",
  };
  categories: Categorie[];

  cat = [];
  movie: MovieResponse = {
    id: 0,
    title: '',
    description: '',
    director: {
      name: '',
      link: '',
    },
    actors: [],
    categories: [],
    images: [],
    traillers: []
  };
  constructor(private movieService: MovieService, private router: Router) { }

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories(): void {
    this.movieService.getAllCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => { console.error(err); }
    });
  }

  setCat(e: Event): void {
    e.stopPropagation();
      if (e.target["checked"]) {
        var newCategorie: Categorie = {
          cat_id: 0,
          description: "",
          name: e.target["name"]
        };
        this.cat.push(newCategorie);
      }
  }

  saveMovie(): void {
    const act = {
      age: this.actor.age,
      firstName: this.actor.firstName,
      lastName: this.actor.lastName,
      photoLink: this.actor.photoLink
    }
    const data = {
      title: this.movie.title,
      description: this.movie.description,
      director: this.movie.director,
      actors: [act],
      categories: this.cat
    };
    this.movieService.create(data).subscribe({
      next: (data) => {
        console.log(data);
        const movie_id = data.id;
        this.uploadCover(this.movieCover, movie_id);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
  selectImage(event: Event): void {
    this.movieCover = (event.target as HTMLInputElement).files.item(0);
    if ((event.target as HTMLInputElement).files.item(0)) {
      const reader = new FileReader();
      reader.onload = (e) => (this.coverPreview = reader.result.toString());

      reader.readAsDataURL((event.target as HTMLInputElement).files.item(0));
    }
  }
  uploadCover(file: File, movie_id: number): void {
    if (file) {
      this.movieService.uploadImage(file, movie_id, true).subscribe(
        (event: any) => {
          if (event instanceof HttpResponse) {
            console.log(event.body);
            this.router.navigateByUrl('/movies');
          }
        },
        (err: any) => {
          console.error(err);
        }
      );
    } else {
      console.log('No File');
    }
  }
}
