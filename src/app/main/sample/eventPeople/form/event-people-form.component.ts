import { EventPeople } from "app/auth/models/eventPeople";
import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { CoreConfigService } from "@core/services/config.service";
import { ActivatedRoute, Router } from "@angular/router";
import { takeUntil } from "rxjs/operators";
import { EventPeopleService } from "app/services/eventPeople.service";
import { EventService } from "app/services/event.service";
import { Event } from "app/auth/models/event";

@Component({
  selector: "app-event-people-form.",
  templateUrl: "./event-people-form.component.html",
  styleUrls: ["./event-people-form.component.scss"],
})
export class EventPeopleFormComponent implements OnInit {
  constructor(
    private _coreConfigService: CoreConfigService,
    private _formBuilder: UntypedFormBuilder,
    private _route: ActivatedRoute,
    private _router: Router,
    private eventPeopleService: EventPeopleService,
    private eventService: EventService
  ) {}

  public contentHeader: object;
  public coreConfig: any;
  public loginForm: UntypedFormGroup;
  public loading = false;
  public submitted = false;
  public returnUrl: string;
  public error = "";
  public passwordTextType: boolean;
  public confirmPasswordTextType: boolean;

  eventPeople: EventPeople = undefined;

  events: Event[] = [];

  get f() {
    return this.loginForm.controls;
  }

  ngOnInit(): void {

    this.getEvents();

    this.loginForm = this._formBuilder.group({
      name: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      telephoneNumber: [""],
      event: [null],
    });

    this.eventPeople = new EventPeople();

    if (this._route.snapshot.params.id != null) {
      this.eventPeopleService
        .getById(this._route.snapshot.params.id)
        .subscribe((data) => {
          this.eventPeople.id = this._route.snapshot.params.id;
          this.eventPeople.email = data.email;
          this.eventPeople.name = data.name;
          this.eventPeople.telephoneNumber = data.telephoneNumber;
          this.eventPeople.event = data.event;

          this.loginForm.patchValue({
            name: this.eventPeople.name,
            email: this.eventPeople.email,
            telephoneNumber: this.eventPeople.telephoneNumber,
            event: this.eventPeople.event,
          });
        });
    } else {
    }

    this.contentHeader = {
      headerTitle: "EventPeople",
      actionButton: true,
      breadcrumb: {
        type: "",
        links: [],
      },
    };

    // get return url from route parameters or default to '/'
    this.returnUrl = this._route.snapshot.queryParams["returnUrl"] || "/";
  }

  getEvents(){
    this.eventService.getAll().subscribe((data: any) => {
      this.events = data;
    })
  }

  onSubmit() {
    //this.loading = true;
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.eventPeople.createEventPeople(this.loginForm.controls);

    if (this.eventPeople.id != undefined) {
      this.eventPeopleService.update(this.eventPeople).subscribe(() => {
        this._router.navigate(["/eventPeople"]);
      });
    } else {
      this.eventPeopleService.save(this.eventPeople).subscribe(() => {
        this._router.navigate(["/eventPeople"]);
      });
    }
  }
  
}
