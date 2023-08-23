import { Role } from "./role";
import { NgModule } from "@angular/core";

@NgModule({
  // Configurações do módulo
})
export class EventPeople {
  static component: any;

  id: number;
  email: string;
  name: string;
  telephoneNumber: number;
  event: string;

  createEventPeople(value: any) {
    this.email = value.email.value;
    this.name = value.name.value;
    this.telephoneNumber = value.telephoneNumber.value;
    this.event = value.event.value;
  }
}
