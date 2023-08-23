import { Event } from "app/auth/models/event";
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
import { EventService } from "app/services/event.service";

@Component({
  selector: "app-event-form.",
  templateUrl: "./event-form.component.html",
  styleUrls: ["./event-form.component.scss"],
})
export class EventFormComponent implements OnInit {
  constructor(
    private _coreConfigService: CoreConfigService,
    private _formBuilder: UntypedFormBuilder,
    private _route: ActivatedRoute,
    private _router: Router,
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

  event: Event = undefined;

  get f() {
    return this.loginForm.controls;
  }

  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      name: ["", Validators.required],
      date: ["", Validators.required],
    });

    this.event = new Event();

    if (this._route.snapshot.params.id != null) {
      this.eventService
        .getById(this._route.snapshot.params.id)
        .subscribe((data) => {
          this.event.id = this._route.snapshot.params.id;
          this.event.name = data.name;
          this.event.date = data.date;

          this.loginForm.patchValue({
            name: this.event.name,
            date: this.event.date,
          });
        });
    } else {
    }

    this.contentHeader = {
      headerTitle: "Events",
      actionButton: true,
      breadcrumb: {
        type: "",
        links: [],
      },
    };

    // get return url from route parameters or default to '/'
    this.returnUrl = this._route.snapshot.queryParams["returnUrl"] || "/";
  }

  onSubmit() {
    //this.loading = true;
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    this.event.createUser(this.loginForm.controls);

    if (this.event.id != undefined) {
      this.eventService.update(this.event).subscribe(() => {
        this._router.navigate(["/event"]);
      });
    } else {
      this.eventService.save(this.event).subscribe(() => {
        this._router.navigate(["/event"]);
      });
    }
  }
}
