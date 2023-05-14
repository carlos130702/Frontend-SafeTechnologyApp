import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {HomeNavbarComponent} from "./components/home-navbar/home-navbar.component";
import {LoginComponent} from "./pages/login/login.component";
import {RegisterComponent} from "./pages/register/register.component";
import {RegisterClientComponent} from "./pages/register-client/register-client.component";
import {RouterModule} from "@angular/router";
import {HomeComponent} from "./pages/home/home.component";
import {RegisterTechnicianComponent} from "./pages/register-technician/register-technician.component";
import {MatCardModule} from "@angular/material/card";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatInputModule} from "@angular/material/input";
import {FlexModule} from "@angular/flex-layout";
import {ReactiveFormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";



@NgModule({
  declarations: [
    HomeNavbarComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    RegisterClientComponent,
  RegisterTechnicianComponent,
  ],
    imports: [
        CommonModule,
        RouterModule,
        MatCardModule,
        MatToolbarModule,
        MatInputModule,
        FlexModule,
        ReactiveFormsModule,
        MatIconModule,
        MatButtonModule,
        NgOptimizedImage
    ],
  exports: [
    HomeNavbarComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    RegisterClientComponent,
    RegisterClientComponent,
  ]
})
export class SharedModule { }
