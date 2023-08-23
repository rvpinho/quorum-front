import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { environment } from "environments/environment";
import { BasicService } from "./basic.service";
import { EventPeople } from "app/auth/models/eventPeople";

@Injectable({ providedIn: "root" })
export class EventPeopleService extends BasicService {
  constructor(http: HttpClient) {
    super(environment.apiUrl, "eventPeople", http);
  }

  getAll() {
    return this.getHttp().get<EventPeople[]>(
      `${environment.apiUrl}/eventPeople`
    );
  }

  getByEventName(eventName) {
    return this.getHttp().get<EventPeople[]>(
      `${environment.apiUrl}/eventPeople/byName/${eventName}`
    );
  }

  getById(id: number) {
    return this.getHttp().get<EventPeople>(
      `${environment.apiUrl}/eventPeople/${id}`
    );
  }

  save(eventPeople: EventPeople) {
    return this.getHttp().post<EventPeople>(
      `${environment.apiUrl}/eventPeople`,
      eventPeople
    );
  }

  update(eventPeople: EventPeople) {
    return this.getHttp().put<EventPeople>(
      `${environment.apiUrl}/eventPeople/${eventPeople.id}`,
      eventPeople
    );
  }

  deleteEventPeople(eventPeopleId: string) {
    return this.getHttp().delete<EventPeople>(
      `${environment.apiUrl}/eventPeople/${eventPeopleId}`
    );
  }

  uploadEventPeopleList(file: File, eventSelected: string) {
    const formData = new FormData();
    formData.append('file', file);

    return this.getHttp().post(`${environment.apiUrl}/eventPeople/upload/${eventSelected}`, formData);
  }

  downloadTemplate() {
    return this.getHttp().get(`${environment.apiUrl}/eventPeople/generate-template`, { responseType: 'blob' });
  }

  generateQRCode(itemId: string) {
    return this.getHttp().get(`${environment.apiUrl}/eventPeople/qrcode/${itemId}`, { responseType: 'blob' });
  }

}
