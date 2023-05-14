import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AddClientApplianceModelComponent
} from "./components/add-client-applianceModel/add-client-applianceModel.component";
import {AddClientAppointmentComponent} from "./components/add-client-appointment/add-client-appointment.component";
import {ClientNavbarComponent} from "./components/client-navbar/client-navbar.component";
import {
  EditClientApplianceModelComponent
} from "./components/edit-client-appliance/edit-client-applianceModel.component";
import {EditClientAppointmentComponent} from "./components/edit-client-appointment/edit-client-appointment.component";
import {EditClientProfileComponent} from "./components/edit-client-profile/edit-client-profile.component";
import {EditImageComponent} from "./components/edit-image/edit-image.component";
import {ClientApplianceModelComponent} from "./pages/client-applianceModel/client-applianceModel.component";
import {ClientAppointmentComponent} from "./pages/client-appointment/client-appointment.component";
import {ClientPlanComponent} from "./pages/client-plan/client-plan.component";
import {ClientProfileComponent} from "./pages/client-profile/client-profile.component";
import {TechnicianListComponent} from "./pages/technician-list/technician-list.component";
import {SharedModule} from "../shared/shared.module";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDialogModule} from "@angular/material/dialog";
import {FlexModule} from "@angular/flex-layout";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from "@angular/material/button";
import {RouterModule} from "@angular/router";
import {MatCardModule} from "@angular/material/card";
import {TechnicianModule} from "../technician/technician.module";
import {FilterPipe} from "./pipes/filter.pipe";



@NgModule({
  declarations: [
    AddClientApplianceModelComponent,
    AddClientAppointmentComponent,
    ClientNavbarComponent,
    EditClientApplianceModelComponent,
    EditClientAppointmentComponent,
    EditClientProfileComponent,
    EditImageComponent,
    ClientApplianceModelComponent,
    ClientAppointmentComponent,
    ClientPlanComponent,
    ClientProfileComponent,
    TechnicianListComponent,
    FilterPipe
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDialogModule,
    FlexModule,
    MatSelectModule,
    MatButtonModule,
    RouterModule,
    FormsModule,
    MatCardModule,
    TechnicianModule
  ],
  exports: [
    AddClientApplianceModelComponent,
    AddClientAppointmentComponent,
    ClientNavbarComponent,
    EditClientApplianceModelComponent,
    EditClientAppointmentComponent,
    EditClientProfileComponent,
    EditImageComponent,
    ClientApplianceModelComponent,
    ClientAppointmentComponent,
    ClientPlanComponent,
    ClientProfileComponent,
    TechnicianListComponent
  ]
})
export class ClientModule { }
