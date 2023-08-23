import { CoreMenu } from "@core/types";

export const menu: CoreMenu[] = [
  {
    id: "users",
    title: "Users",
    translate: "Users",
    type: "item",
    icon: "users",
    url: "user",
  },

  {
    id: "events",
    title: "Events",
    translate: "Events",
    type: "item",
    icon: "calendar",
    url: "event",
  },

  {
    id: "eventPeoples",
    title: "Event People",
    translate: "Event People",
    type: "item",
    icon: "user",
    url: "eventPeople",
  },
];
