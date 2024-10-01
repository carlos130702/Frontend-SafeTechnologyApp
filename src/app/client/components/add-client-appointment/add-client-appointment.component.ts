import {Component, Inject, OnInit} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ApplianceModel} from "../../interfaces/appliancemodel";
import {Appointment} from "../../interfaces/appointment";
import { TechniciansService } from "src/app/technician/services/technicians.service";

@Component({
  selector: 'app-add-client-appointment',
  templateUrl: './add-client-appointment.component.html',
  styleUrls: ['./add-client-appointment.component.css']
})
export class AddClientAppointmentComponent implements OnInit{
  appointmentFormGroup= new FormGroup({
    dateReserve: new FormControl('',[Validators.required]),
    dateAttention: new FormControl('',[Validators.required]),
    hour: new FormControl('',[Validators.required]),
  });

  constructor(
    public dialogRef: MatDialogRef<AddClientAppointmentComponent>, private technicianService: TechniciansService,
  @Inject(MAT_DIALOG_DATA) public  data: {applianceModel:ApplianceModel[],selected:string,appointment:Appointment} ,
  ) {
  }

  technicians: any = [];
  technicianSelected: any;

  ngOnInit(): void {
    this.getAllTechnicians();
  }

  getAllTechnicians(): void {
    this.technicianService.getAll().subscribe(response => {
      this.technicians = response;
    })
  }


  onNoClick(): void {
    this.dialogRef.close();
  }
  onClick(): void {
    this.data.appointment.dateReserved=<string>this.appointmentFormGroup.get("dateReserve")?.value;
    this.data.appointment.dateOfAttention=<string>this.appointmentFormGroup.get("dateAttention")?.value;
    this.data.appointment.hour=<string>this.appointmentFormGroup.get("hour")?.value;
    this.data.appointment.technicianId = this.technicianSelected;
  }
}
