import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { environment } from "environments/environment";
import { BasicService } from "./basic.service";
import { Event } from "app/auth/models/event";

@Injectable({ providedIn: "root" })
export class EventService extends BasicService {
  constructor(http: HttpClient) {
    super(environment.apiUrl, "event", http);
  }

  getAll() {
    return this.getHttp().get<Event[]>(`${environment.apiUrl}/events`);
  }

  getById(id: string) {
    return this.getHttp().get<Event>(`${environment.apiUrl}/events/${id}`);
  }

  save(user: Event) {
    return this.getHttp().post<Event>(`${environment.apiUrl}/events`, user);
  }

  update(event: Event) {
    return this.getHttp().put<Event>(
      `${environment.apiUrl}/events/${event.id}`,
      event
    );
  }

  deleteUser(eventId: string) {
    return this.getHttp().delete<Event>(
      `${environment.apiUrl}/events/${eventId}`
    );
  }
}
