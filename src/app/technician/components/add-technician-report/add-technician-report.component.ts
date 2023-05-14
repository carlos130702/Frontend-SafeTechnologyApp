import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {ReportsService} from "../../services/reports.service";
import {ApplianceModel} from "../../../client/interfaces/appliancemodel";
import {Appointment} from "../../../client/interfaces/appointment";
import {AppointmentsService} from "../../../client/services/appointments.service";
import {Report} from "../../interfaces/report";

@Component({
  selector: 'app-add-technician-report',
  templateUrl: './add-technician-report.component.html',
  styleUrls: ['./add-technician-report.component.css']
})
export class AddTechnicianReportComponent {
  reportFormGroup= new FormGroup({
    observation: new FormControl('',[Validators.required]),
    diagnosis: new FormControl('',[Validators.required]),
    repairDescription: new FormControl('',[Validators.required]),
    date: new FormControl('',[Validators.required]),
  });

  constructor(
    public dialogRef: MatDialogRef<AddTechnicianReportComponent>, private http:HttpClient, private reportService:ReportsService,private appointmentsService:AppointmentsService,
  @Inject(MAT_DIALOG_DATA) public data: {appointment:Appointment[],selected:string,report:Report},
  ) {
}
  onNoClick(): void {
    this.dialogRef.close();
  }
  onClick(): void {
    this.data.report.diagnosis=<string>this.reportFormGroup.get("diagnosis")?.value;
    this.data.report.repairDescription=<string>this.reportFormGroup.get("repairDescription")?.value;
    this.data.report.date=<string>this.reportFormGroup.get("date")?.value;
  }

}
