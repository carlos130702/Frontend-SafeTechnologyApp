import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Appointment} from "../../interfaces/appointment";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector:'app-edit-client-appointment',
  templateUrl: './edit-client-appointment.component.html',
  styleUrls: ['./edit-client-appointment.component.css']
})

export class EditClientAppointmentComponent {
  editClientAppointmentFormGroup= new FormGroup({
    dateAttention: new FormControl('',[Validators.required]),
    hour: new FormControl('',[Validators.required]),
  });

  constructor(
    public dialogRef: MatDialogRef<EditClientAppointmentComponent>,
    @Inject(MAT_DIALOG_DATA) public  data: Appointment,
  ){
    this.editClientAppointmentFormGroup.setValue({
      dateAttention:data.dateOfAttention,
      hour:data.hour,
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
