import { Component, OnInit,ViewChild } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Technician} from "../../interfaces/technician";
import {Report} from "../../interfaces/report";
import {TechniciansService} from "../../services/technicians.service";
import {ReportsService} from "../../services/reports.service";
import {EditTechnicianReportComponent} from "../../components/edit-technician-report/edit-technician-report.component";
import {MatDialog} from "@angular/material/dialog";
import {ApplianceModel} from "../../../client/interfaces/appliancemodel";
import {
  AddClientApplianceModelComponent
} from "../../../client/components/add-client-applianceModel/add-client-applianceModel.component";
import {AddTechnicianReportComponent} from "../../components/add-technician-report/add-technician-report.component";
import { AppointmentsService } from 'src/app/client/services/appointments.service';
import {Appointment} from "../../../client/interfaces/appointment";

@Component({
  selector: 'app-technician-report',
  templateUrl: './technician-report.component.html',
  styleUrls: ['./technician-report.component.css']
})
export class TechnicianReportComponent implements OnInit {
  id: String;

  technicianData: Technician[];
  reportsData: Report[];
  appointmentsData: Appointment[];

  constructor(private technicianService: TechniciansService,
              private reportsService:ReportsService, private route: ActivatedRoute,private dialog: MatDialog, private appointmentService: AppointmentsService) {
    this.technicianData = [] as Technician[];
    this.reportsData = [] as Report[];
    this.appointmentsData = [] as Appointment[];
    this.id=this.route.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.updateReportData();
  }

  openDialogAdd(): void{
    let report: Report;
    let technician: Technician;
    report={} as Report;
    technician={} as Technician;
    report.id=0;
    technician.id=Number(this.id);
    report.technicianId=Number(this.id);
    const dialogRef=this.dialog.open(AddTechnicianReportComponent,{
      data:{
      technician:this.technicianData,
        selected:"",
        report:report,
    }
    });

    dialogRef.afterClosed().subscribe(result =>{
      if(result!=undefined){
        report.diagnosis=result.get("diagnosis")?.value;
        report.observation=result.get("observation")?.value;
        report.date=result.get("date")?.value;
        report.repairDescription=result.get("repairDescription")?.value;
        this.reportsService.create(report,report.technicianId).subscribe((response:any)=>{
          this.updateReportData();
          alert("Add report Successfully");
        });
      }
    });
  }
  updateReportData(){
    this.reportsService.getByTechnicianId(this.id).subscribe((response:any)=>{
      this.reportsData=response;
      console.log(response);
    });
  }

  openDialogUpdate(data: Report): void{
    const dialogRef=this.dialog.open(EditTechnicianReportComponent,{
      data: {...data}
    });

    dialogRef.afterClosed().subscribe(result =>{
      if(result!=undefined){
        data.observation=result.get("observation")?.value;
        data.diagnosis=result.get("diagnosis")?.value;
        data.repairDescription=result.get("repairDescription")?.value;
        data.date=result.get("date")?.value;
        this.reportsService.update(data.id,data).subscribe(response=>{
          this.updateReportData();
        })
      }
    });
  }
}
