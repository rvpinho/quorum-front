import { Role } from './role';

export class User {
  id: number;
  email: string;
  password: string;
  name: string;
  login: string;
  avatar: string;
  role: Role;
  token?: string;
  
  createUser(value: any) {
    this.email = value.email.value;
    this.password = value.password.value;
    this.name = value.name.value;
    this.login = value.login.value;
    this.role = Role.User;

  }
}
