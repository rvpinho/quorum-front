import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'environments/environment';
import { User } from 'app/auth/models';
import { BasicService } from './basic.service';

@Injectable({ providedIn: 'root' })
export class UserService extends BasicService{
  
  constructor(http: HttpClient) {
    super(environment.apiUrl, "users", http);
  }

  getAll() {
    return this.getHttp().get<User[]>(`${environment.apiUrl}/users`);
  }

  getById(id: number) {
    return this.getHttp().get<User>(`${environment.apiUrl}/users/${id}`);
  }

  save(user: User) {
    return this.getHttp().post<User>(`${environment.apiUrl}/users`, user);
  }

  update(user: User) {
    return this.getHttp().put<User>(`${environment.apiUrl}/users/${user.id}`, user);
  }

  deleteUser(userId: string) {
    return this.getHttp().delete<User>(`${environment.apiUrl}/users/${userId}`);
  }
}
