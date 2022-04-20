import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Categorie } from 'src/app/models/categorie.model';
import { MovieResponse } from 'src/app/models/movie-response.model';
import { Movie } from 'src/app/models/movie.model';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movie-update',
  templateUrl: './movie-update.component.html',
  styleUrls: ['./movie-update.component.css']
})
export class MovieUpdateComponent implements OnInit {
  movieCover: File | null = null;

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

  constructor(
    private movieService: MovieService,
    private router: Router,
    private actRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.getAllCategories();
    this.movieService
      .getById(this.actRoute.snapshot.params['movie_id'])
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

  updateMovie(id): void {
    const data = {
      title: this.movie.title,
      description: this.movie.description,
      director: this.movie.director,
    };
    this.movieService.update(data, id).subscribe({
      next: (data) => {
        console.log(data);
        this.uploadCover(this.movieCover, id);
      }, error: (err) => {
        console.log(err);
      }
    });
  }
  selectImage(event: Event): void {
    this.movieCover = (event.target as HTMLInputElement).files.item(0);
    if ((event.target as HTMLInputElement).files.item(0)) {
      const reader = new FileReader();
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
