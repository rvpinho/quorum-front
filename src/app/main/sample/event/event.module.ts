import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { CoreCommonModule } from "@core/common.module";
import { EventComponent } from "./index/event.component";
import { ContentHeaderComponent } from "app/layout/components/content-header/content-header.component";
import { ContentHeaderModule } from "app/layout/components/content-header/content-header.module";
import { TranslateModule } from "@ngx-translate/core";
import { RouterModule } from "@angular/router";
import { EventFormComponent } from "./form/event-form.component";

// routing
const routes = [
  {
    path: "event",
    component: EventComponent,
    data: { animation: "sample" },
  },
  {
    path: "event/edit/:id",
    component: EventFormComponent,
    data: { animation: "sample" },
  },
  {
    path: "event/create",
    component: EventFormComponent,
    data: { animation: "sample" },
  },
];

@NgModule({
  declarations: [EventComponent, EventFormComponent],
  imports: [
    RouterModule.forChild(routes),
    ContentHeaderModule,
    TranslateModule,
    CoreCommonModule,
  ],
  exports: [EventComponent, EventFormComponent],
})
export class EventModule {}
