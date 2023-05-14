import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Client} from "../../interfaces/client";
import {ClientsService} from "../../services/clients.service";


@Component({
  selector: 'app-client-plan',
  templateUrl: './client-plan.component.html',
  styleUrls: ['./client-plan.component.css']
})
export class ClientPlanComponent implements OnInit {

  public planItems = [
    { label: 'Basic', price: '4.90', url: 'https://i.imgur.com/Xup56ec.jpg', description: 'Registra hasta 4 citas al mes'  },
    { label: 'Standard', price: '6.90', url: 'https://i.imgur.com/Ycbaez2.jpg', description: 'Registra hasta 8 citas al mes'  },
    { label: 'Premium', price: '10.90', url: 'https://i.imgur.com/vmCJdxC.jpg', description: 'Registra hasta tantas citas como quieras al mes'  },
  ]


  id: string;
  clientData: Client;
  constructor(private route: ActivatedRoute, private clientsService: ClientsService) {
    this.clientData={} as Client;
    this.id=this.route.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.updatePlansData();
  }

  updatePlansData(){
    this.clientsService.getById(this.id).subscribe((response:any)=>{
      this.clientData=response;
      console.log(response);
    });
  }
  clickAddTodo(e:any){
    alert(`${e} Plan successfully selected`);
    this.clientData.planType=e;
    this.clientsService.update(this.clientData.id,this.clientData).subscribe((response:any)=>{
      this.updatePlansData();
    })
  }
}
