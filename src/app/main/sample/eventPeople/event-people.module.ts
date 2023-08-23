import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { CoreCommonModule } from "@core/common.module";
import { EventPeopleComponent } from "./index/event-people.component";
import { ContentHeaderComponent } from "app/layout/components/content-header/content-header.component";
import { ContentHeaderModule } from "app/layout/components/content-header/content-header.module";
import { TranslateModule } from "@ngx-translate/core";
import { RouterModule } from "@angular/router";
import { EventPeopleFormComponent } from "./form/event-people-form.component";

// routing
const routes = [
  {
    path: "eventPeople",
    component: EventPeopleComponent,
    data: { animation: "sample" },
  },
  {
    path: "eventPeople/edit/:id",
    component: EventPeopleFormComponent,
    data: { animation: "sample" },
  },
  {
    path: "eventPeople/create",
    component: EventPeopleFormComponent,
    data: { animation: "sample" },
  },
];

@NgModule({
  declarations: [EventPeopleComponent, EventPeopleFormComponent],
  imports: [
    RouterModule.forChild(routes),
    ContentHeaderModule,
    TranslateModule,
    CoreCommonModule    
  ],
  exports: [EventPeopleComponent, EventPeopleFormComponent],
})
export class EventPeopleModule {}
