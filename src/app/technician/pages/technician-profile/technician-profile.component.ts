import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {Technician} from "../../interfaces/technician";
import {TechniciansService} from "../../services/technicians.service";
import {EditTechnicianProfileComponent} from "../../components/edit-technician-profile/edit-technician-profile.component";
import {Client} from "../../../client/interfaces/client";
import {EditImageComponent} from "../../../client/components/edit-image/edit-image.component";
import {EditImageTechnicianComponent} from "../../components/edit-image-technician/edit-image-technician.component";

@Component({
  selector: 'app-technician-profile',
  templateUrl: './technician-profile.component.html',
  styleUrls: ['./technician-profile.component.css']
})
export class TechnicianProfileComponent implements OnInit {

  id:string;
  technicianActual: Technician;

  constructor(private techniciansService: TechniciansService, private route: ActivatedRoute,
              private dialog: MatDialog) {
    this.id=this.route.snapshot.paramMap.get('id')!;
    this.technicianActual={} as Technician;
  }

  ngOnInit(): void {
    this.getActualData();
  }

  getActualData():void{
    this.techniciansService.getById(this.id).subscribe((response:any)=>{
      this.technicianActual=response;
    })
  }
  openDialogImage(data: Technician): void {
    const dialogRef=this.dialog.open(EditImageTechnicianComponent,{
      data:{...data}
    });

    dialogRef.afterClosed().subscribe(result=>{
      if(result!=undefined){
        data.profileImageUrl=result.get("urlToProfile")?.value;
        this.techniciansService.update(data.id,data).subscribe(response=>{
          this.getActualData();
        })
      }
    })
  }
  openDialog(data: Technician): void {
    const dialogRef=this.dialog.open(EditTechnicianProfileComponent,{
      data:{...data}
    });

    dialogRef.afterClosed().subscribe(result=>{
      if(result!=undefined){
        data.firstName=result.get("names")?.value;
        data.firstName=result.get("lastNames")?.value;
        data.address=result.get("address")?.value;
        data.phoneNumber=result.get("cellPhoneNumber")?.value;
        data.email=result.get("email")?.value;
        data.password=result.get("password")?.value;
        this.techniciansService.update(data.id,data).subscribe(response=>{
          this.getActualData();
        })
      }
    })
  }
}
