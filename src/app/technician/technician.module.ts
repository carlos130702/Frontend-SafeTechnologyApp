import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AddTechnicianReportComponent} from "./components/add-technician-report/add-technician-report.component";
import {EditImageTechnicianComponent} from "./components/edit-image-technician/edit-image-technician.component";
import {EditTechnicianProfileComponent} from "./components/edit-technician-profile/edit-technician-profile.component";
import {EditTechnicianReportComponent} from "./components/edit-technician-report/edit-technician-report.component";
import {TechnicianNavbarComponent} from "./components/technician-navbar/technician-navbar.component";
import {TechnicianProfileComponent} from "./pages/technician-profile/technician-profile.component";
import {TechnicianReportComponent} from "./pages/technician-report/technician-report.component";
import {TechnicianRouteComponent} from "./pages/technician-route/technician-route.component";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {MatDialogModule} from "@angular/material/dialog";
import {MatSelectModule} from "@angular/material/select";
import {FlexModule} from "@angular/flex-layout";
import {MatButtonModule} from "@angular/material/button";
import {RouterModule} from "@angular/router";
import {SharedModule} from "../shared/shared.module";
import {ClientModule} from "../client/client.module";



@NgModule({
  declarations: [
    AddTechnicianReportComponent,
    EditImageTechnicianComponent,
    EditTechnicianProfileComponent,
    EditTechnicianReportComponent,
    TechnicianNavbarComponent,
    TechnicianProfileComponent,
    TechnicianReportComponent,
    TechnicianRouteComponent
  ],
    imports: [
        CommonModule,
        MatInputModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatSelectModule,
        FlexModule,
        MatButtonModule,
        RouterModule,
        SharedModule,
    ],
  exports: [
    AddTechnicianReportComponent,
    EditImageTechnicianComponent,
    EditTechnicianProfileComponent,
    EditTechnicianReportComponent,
    TechnicianNavbarComponent,
    TechnicianProfileComponent,
    TechnicianReportComponent,
    TechnicianRouteComponent
  ]
})
export class TechnicianModule { }
