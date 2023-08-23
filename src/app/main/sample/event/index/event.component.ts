import { Event } from "app/auth/models/event";
import { Component, OnInit } from "@angular/core";
import { ChangeDetectorRef } from "@angular/core";
import { Router } from "@angular/router";
import { EventService } from "app/services/event.service";

@Component({
  selector: "app-event.",
  templateUrl: "./event.component.html",
  styleUrls: ["./event.component.scss"],
})
export class EventComponent implements OnInit {
  constructor(
    private eventService: EventService,
    private cdr: ChangeDetectorRef,
    private _router: Router
  ) {}

  public contentHeader: object;

  popupVisivel = false;

  events: Event[];

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit() {
    this.contentHeader = {
      headerTitle: "Events",
      actionButton: true,
      breadcrumb: {
        type: "",
        links: [],
      },
    };

    this.events = [];

    this.eventService.getAll().subscribe((data) => {
      data.forEach((element) => {
        let event = new Event();
        event.id = element["_id"];
        event.name = element.name;
        event.date = element.date;
        this.events.push(event);
        this.cdr.detectChanges();
      });
    });
  }

  deleteEvent(eventId: string) {
    this.eventService.deleteUser(eventId).subscribe(() => {
      window.location.reload();
    });
  }
}
