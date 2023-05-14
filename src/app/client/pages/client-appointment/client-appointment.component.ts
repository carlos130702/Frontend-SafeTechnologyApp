import { Component, OnInit } from '@angular/core';
import {ApplianceModel} from "../../interfaces/appliancemodel";
import {ActivatedRoute} from "@angular/router";
import {AppliancesModelService} from "../../services/appliancesmodel.service";
import {MatDialog} from "@angular/material/dialog";
import {Appointment} from "../../interfaces/appointment";
import {AppointmentsService} from "../../services/appointments.service";
import {EditClientAppointmentComponent} from "../../components/edit-client-appointment/edit-client-appointment.component";
import {AddClientAppointmentComponent} from "../../components/add-client-appointment/add-client-appointment.component";

@Component({
  selector: 'app-client-appointment',
  templateUrl: './client-appointment.component.html',
  styleUrls: ['./client-appointment.component.css']
})
export class ClientAppointmentComponent implements OnInit {
  id: string;
  appointmentData: Appointment[];
  appliancesModelData: ApplianceModel[];

  constructor(private route: ActivatedRoute, private appointmentsService: AppointmentsService,private appliancesModelService: AppliancesModelService,
              private dialog: MatDialog) {
    this. appointmentData=[] as Appointment[];
    this. appliancesModelData=[] as ApplianceModel[];
    this.id=this.route.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.addAppointmentsData();
  }

  addAppointmentsData(){
    this.appointmentData=[];
    this.appliancesModelData=[];
    this.appointmentsService.getByClientId(this.id).subscribe((response:any)=>{
      this.appointmentData=response;
    })
    this.appliancesModelService.getByClientId(this.id).subscribe((response:any)=>{
      this.appliancesModelData=response;
    })
  }
  openDialogAdd(): void {
    const applianceModel = {} as ApplianceModel;
    applianceModel.id = 0;
    applianceModel.clientId = Number(this.id);

    const appointment = {
      id: 0,
      clientId: Number(this.id),
      applianceModelId: '',
      dateReserve: '',
      dateAttention: '',
      hour: '',
      technicianId: '',
      status: true
    };
    const dialogRef=this.dialog.open(AddClientAppointmentComponent,{
      data: {
        applianceModel:this.appliancesModelData,
        selected:"",
        appointment:appointment,
        technicianId: ""
      }
    });

    dialogRef.afterClosed().subscribe(result =>{
      if(result!=undefined){
        appointment.clientId=result.appointment.clientId;
        appointment.applianceModelId=result.selected;
        appointment.dateReserve=result.appointment.dateReserve;
        appointment.dateAttention=result.appointment.dateAttention;
        appointment.hour=result.appointment.hour;
        appointment.technicianId = result.appointment.technicianId;
        appointment.status = true;

        this.appointmentsService.create(appointment.clientId,appointment.applianceModelId, appointment.technicianId ,appointment)
          .subscribe((response:any)=>{
          this.addAppointmentsData();
          alert("Add appointment Successfully");
        });
      }
    });
  }
  openDialogUpdate(data: Appointment): void {
    const dialogRef = this.dialog.open(EditClientAppointmentComponent, {
      data: { ...data }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        const updatedData = { ...data, ...result.value };
        this.updateAppointmentData(updatedData);
      }
    });
  }

  updateAppointmentData(data: Appointment): void {
    if (confirm('¿Está seguro de que desea actualizar esta cita?')) {
      this.appointmentsService.update(data.id, data).subscribe(response => {
        this.addAppointmentsData();
        console.log("Cita actualizada correctamente");
      });
    }
  }

  deleteAppointmentData(appointment: Appointment): void {
    if (confirm('¿Está seguro de que desea eliminar esta cita?')) {
      const index = this.appointmentData.findIndex(a => a.id === appointment.id);
      if (index !== -1) {
        this.appointmentData.splice(index, 1);
        this.appointmentsService.delete(appointment.id).subscribe((response: any) => {
          this.addAppointmentsData();
          alert("Cita eliminada correctamente");
        });
      }
    }
  }


}

