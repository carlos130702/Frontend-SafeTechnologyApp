import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import {ClientsService} from "./client/services/clients.service";
import {TechniciansService} from "./technician/services/technicians.service";
import {AppointmentsService} from "./client/services/appointments.service";
import {JwtInterceptor} from "./auth/jwt-interceptor";
import {AppliancesModelService} from "./client/services/appliancesmodel.service";
import {ReportsService} from "./technician/services/reports.service";
import {SharedModule} from "./shared/shared.module";
import {TechnicianModule} from "./technician/technician.module";
import {ClientModule} from "./client/client.module";


@NgModule({ declarations: [
        AppComponent,
    ],
    exports: [],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        SharedModule,
        TechnicianModule,
        ClientModule], providers: [
        ClientsService,
        TechniciansService,
        AppliancesModelService,
        AppointmentsService,
        ReportsService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: JwtInterceptor,
            multi: true
        },
        provideHttpClient(withInterceptorsFromDi())
    ] })
export class AppModule { }
