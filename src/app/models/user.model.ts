export class User {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  city: string;
  password: string;

  constructor(
    username: string,
    email: string,
    firstName: string,
    lastName: string,
    city: string,
    password: string
  ) {
    this.username = username;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.city = city;
    this.password = password;
  }
}
