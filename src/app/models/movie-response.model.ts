import { Actor } from './actor.model';
import { Categorie } from './categorie.model';
import { Director } from './director.model';
import { MovieCover } from './movie-cover.model';
import { Trailler } from './trailler.model';

export class MovieResponse {
  id:number;
  title: string;
  description: string;
  director: Director;
  actors: Actor[];
  images: MovieCover[];
  categories: Categorie[];
  traillers: Trailler[];

  constructor(
    id:number,
    title: string,
    description: string,
    director: Director,
    actors: Actor[],
    images: MovieCover[],
    categories: Categorie[],
    traillers: Trailler[]
  ) {
    this.id=id;
    this.title = title;
    this.description = description;
    this.director = director;
    this.actors = actors;
    this.categories = categories;
    this.images = images;
    this.traillers = traillers;
  }
}
