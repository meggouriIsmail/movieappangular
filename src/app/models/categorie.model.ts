export class Categorie {
    cat_id: number;
    name: string;
    description: string;

    constructor(cat_id: number, name: string, description: string) {
        this.cat_id = cat_id;
        this.name = name;
        this.description = description;
    }
}
