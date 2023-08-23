import { Role } from "./role";

export class Event {
  name: string;
  date: Date;
  id: number;

  createUser(value: any) {
    this.date = value.date.value;
    this.name = value.name.value;
  }
}
