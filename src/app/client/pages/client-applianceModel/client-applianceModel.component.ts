import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute} from "@angular/router";
import {AddClientApplianceModelComponent} from "../../components/add-client-applianceModel/add-client-applianceModel.component";
import {EditClientApplianceModelComponent} from "../../components/edit-client-appliance/edit-client-applianceModel.component";
import {ApplianceModel} from "../../interfaces/appliancemodel";
import {AppliancesModelService} from "../../services/appliancesmodel.service";

@Component({
  selector: 'app-client-applianceModel',
  templateUrl: './client-applianceModel.component.html',
  styleUrls: ['./client-applianceModel.component.css']
})
export class ClientApplianceModelComponent implements OnInit {
  id: string;
  appliancesModelData: ApplianceModel[];
  searchTag: string;



  constructor(private route: ActivatedRoute,private appliancesModelService: AppliancesModelService,
              private dialog: MatDialog) {
    this.searchTag = '';
    this. appliancesModelData=[] as ApplianceModel[];
    this.id=this.route.snapshot.paramMap.get('id')!;
  }
  @ViewChild('txtTagInput')
  public tagInput!: ElementRef<HTMLInputElement>;
  ngOnInit(): void {
    this.addAppliancesData();
  }

  addAppliancesData(){
    this.appliancesModelService.getByClientId(this.id).subscribe((response:any)=>{
      this.appliancesModelData=response;
      console.log(response);
    });
  }

  openDialogAdd(): void {
    const dialogRef = this.dialog.open(AddClientApplianceModelComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        const newAppliance = {
          clientId: this.id,
          name: result.get("name")?.value,
          model: result.get("model")?.value,
          urlToImage: result.get("urlToImage")?.value
        };

        this.appliancesModelService.create(newAppliance,this.id).subscribe(response => {
          this.addAppliancesData();
          alert("Electrodomestico añadido correctamente");
        });
      }
    });
  }

  openDialogUpdate(data: ApplianceModel): void {
    const dialogRef = this.dialog.open(EditClientApplianceModelComponent, {
      data: { ...data }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        const updatedData = { ...data, ...result.value };

        this.updateApplianceData(updatedData);
      }
    });
  }

  updateApplianceData(data: ApplianceModel): void {
    if (confirm('¿Está seguro de que desea eliminar este electrodoméstico?')) {
      this.appliancesModelService.update(data.id, data).subscribe(response => {
        this.addAppliancesData();
        console.log("Electrodomestico actualizado correctamente");
      });
    }
  }

  deleteApplianceData(appliance: ApplianceModel): void {
    if (confirm('¿Está seguro de que desea eliminar este electrodoméstico?')) {
      const index = this.appliancesModelData.findIndex(a => a.id === appliance.id);
      if (index !== -1) {
        this.appliancesModelData.splice(index, 1);
        this.appliancesModelService.delete(appliance.id).subscribe((response: any) => {
          this.addAppliancesData();
          alert("Electrodomestico eliminado correctamente");
        });
      }
    }
  }

}

