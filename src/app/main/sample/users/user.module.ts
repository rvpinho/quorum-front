import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { CoreCommonModule } from "@core/common.module";
import { UserComponent } from "./index/user.component";
import { ContentHeaderComponent } from "app/layout/components/content-header/content-header.component";
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from "@angular/router";
import { UserFormComponent } from "./form/user-form.component";


// routing
const routes = [
    {
        path: 'user',
        component: UserComponent,
        data: { animation: 'sample' }
    },
    {
        path: 'user/edit/:id',
        component: UserFormComponent,
        data: { animation: 'sample' }
    },
    {
        path: 'user/create',
        component: UserFormComponent,
        data: { animation: 'sample' }
    }
];

@NgModule({
    declarations: [UserComponent, UserFormComponent],
    imports: [RouterModule.forChild(routes), ContentHeaderModule, TranslateModule, CoreCommonModule],
    exports: [UserComponent, UserFormComponent]
})
export class UserModule { }
