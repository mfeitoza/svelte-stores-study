export interface IUser {
  id: string
  email: string
  first_name: string
  last_name: string
  avatar: string
}

export class User {
  id: string
  email: string
  firstName: string
  lastName: string
  avatar: string

  constructor({ id, email, first_name, last_name, avatar}: IUser) {
    this.id = id
    this.email = email
    this.firstName = first_name
    this.lastName = last_name
    this.avatar = avatar
  }

  get fullName() {
    return `${this.firstName} ${this.lastName}`
  }
}