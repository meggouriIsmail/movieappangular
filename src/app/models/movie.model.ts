import { Director } from "./director.model";

export class Movie {
    title: string;
    description: string;
    director: Director;

    constructor(title: string, description: string, director: Director) {
        this.title = title;
        this.description = description;
        this.director = director;
    }

}
