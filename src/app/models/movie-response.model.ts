import { Actor } from "./actor.model";
import { Categorie } from "./categorie.model";
import { Director } from "./director.model";
import { MovieCover } from "./movie-cover.model";

export class MovieResponse {
    title: string;
    description: string;
    director: Director;
    actors: Actor[];
    images: MovieCover[];
    categories: Categorie[];

    constructor(title: string, description: string, director: Director, actors: Actor[], images: MovieCover[], categories: Categorie[]) {
        this.title = title;
        this.description = description;
        this.director = director;
        this.actors=actors;
        this.categories=categories;
        this.images=images;
    }
}
