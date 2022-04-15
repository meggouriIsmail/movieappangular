export class MovieCover {
    id: string;
    imageType: string;
    imageName: string;
    imageLink: string;

    constructor(id: string, imageType: string, imageName: string, imageLink: string) {
        this.id = id;
        this.imageType = imageType;
        this.imageName = imageName;
        this.imageLink = imageLink;
    }
}
