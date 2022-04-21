import { Movie } from "./movie.model";

export class Actor {
  actor_id: number;
  firstName: string;
  lastName: string;
  age: number;
  photoLink: string;
  movies: Movie[];

  constructor(
    actor_id: number,
    firstName: string,
    lastName: string,
    age: number,
    photoLink: string,
    movies: Movie[]
  ) {
    this.actor_id = actor_id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.photoLink = photoLink;
    this.movies = movies
  }
}
