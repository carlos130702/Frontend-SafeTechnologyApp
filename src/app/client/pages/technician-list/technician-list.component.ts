import { Component, OnInit } from '@angular/core';
import {Technician} from "../../../technician/interfaces/technician";
import {TechniciansService} from "../../../technician/services/technicians.service";
import {ActivatedRoute} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {Appointment} from "../../interfaces/appointment";

@Component({
  selector: 'app-c',
  templateUrl: './technician-list.component.html',
  styleUrls: ['./technician-list.component.css']
})
export class TechnicianListComponent implements OnInit {


  id: string;
  technicians: Technician[];

  constructor(private techniciansService: TechniciansService, private route: ActivatedRoute,
              private dialog: MatDialog) {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this. technicians=[] as Technician[];
  }

  ngOnInit(): void {
    this.getAllTechnicians();
  }


  getAllTechnicians(): void {
    this.techniciansService.getAll().subscribe((response: any) => {
      this.technicians = response;
    })
  }
}
