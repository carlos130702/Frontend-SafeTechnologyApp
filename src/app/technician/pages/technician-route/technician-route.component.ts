import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Client} from "../../../client/interfaces/client";
import {Appointment} from "../../../client/interfaces/appointment";
import {ClientsService} from "../../../client/services/clients.service";
import {AppointmentsService} from "../../../client/services/appointments.service";

@Component({
  selector: 'app-technician-route',
  templateUrl: './technician-route.component.html',
  styleUrls: ['./technician-route.component.css']
})
export class TechnicianRouteComponent implements OnInit {
  id: String;

 clientData: Client[];
  appointmentData: any[];

  constructor(private clientsService: ClientsService,
              private appointmentsService:AppointmentsService, private route: ActivatedRoute) {
    this.clientData = [] as Client[];
    this.appointmentData = [] as Appointment[];
    this.id=this.route.snapshot.paramMap.get('id')!;
  }
  ngOnInit(): void {
    this.updateRoutesData();
  }

  updateRoutesData(){
    this.appointmentData=[];
    this.clientData=[];

    this.appointmentsService.getByTechnicianId(this.id).subscribe((response: any) => {
      this.appointmentData=response;
    })
  }
}
