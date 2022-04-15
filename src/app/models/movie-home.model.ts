import { Director } from "./director.model";
import { MovieCover } from "./movie-cover.model";

export class MovieHome {
    id: number;
    title: string;
    description: string;
    timestamp: string;
    director: Director;
    cover: MovieCover;

    constructor(id: number, title: string, description: string, timestamp: string, director: Director, cover: MovieCover) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.timestamp = timestamp;
        this.director = director;
        this.cover = cover;
    }
}
