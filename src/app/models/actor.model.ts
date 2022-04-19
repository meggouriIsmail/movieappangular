export class Actor {
    actor_id: number;
    firstName: string;
    lastName: string;
    age: number;
    photoLink: string;
  
    constructor(
      actor_id: number,
      firstName: string,
      lastName: string,
      age: number,
      photoLink: string
    ) {
      this.actor_id = actor_id;
      this.firstName = firstName;
      this.lastName = lastName;
      this.age = age;
      this.photoLink = photoLink;
    }
  }
  