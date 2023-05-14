import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, FormControl, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Client} from "../../../client/interfaces/client";
import {ClientsService} from "../../../client/services/clients.service";
import {UsersService} from "../../services/users.service";

@Component({
  selector: 'app-register-client',
  templateUrl: './register-client.component.html',
  styleUrls: ['./register-client.component.css']
})
export class RegisterClientComponent implements OnInit,AfterViewInit {
   user:Client;

  registerClientFormGroup= new FormGroup({
    username: new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(15)]),
    names: new FormControl('',[Validators.required,Validators.minLength(2),Validators.maxLength(15)]),
    lastNames: new FormControl('',[Validators.required,Validators.minLength(2),Validators.maxLength(15)]),
    address: new FormControl('',[Validators.required,Validators.minLength(4)]),
    urlToProfile: new FormControl('',[Validators.required,Validators.minLength(4)]),
    cellPhoneNumber: new FormControl('',[Validators.required, Validators.pattern("^(9)([0-9]){8}$")]),
    email: new FormControl('',[Validators.required,
      Validators.email]),
    password: new FormControl('',[Validators.required,
      Validators.minLength(6)])
  });

  constructor(private fb:FormBuilder,private http:HttpClient,private route:Router,private clientsService:ClientsService,
              private usersService: UsersService)
  {
    this.user={}as Client;
  }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
  }
  SubmitRegisterClient(){
    if(this.registerClientFormGroup.valid) {
      let role: string[] = ["ROLE_CLIENT"];
      this.usersService.registerUser({
        username: this.registerClientFormGroup.get('username')?.value,
        email: this.registerClientFormGroup.get('email')?.value,
        password: this.registerClientFormGroup.get('password')?.value,
        roles: role
      }).subscribe((response: any) => {
        console.log(response);
        this.usersService.authenticateUser({
          username: this.registerClientFormGroup.get('username')?.value,
          password: this.registerClientFormGroup.get('password')?.value
        }).subscribe((response2: any)=>{
          console.log(response2);
          localStorage.setItem('token',response2.token);
          this.user.username=<string>this.registerClientFormGroup.get("username")?.value;
          this.user.names=<string>this.registerClientFormGroup.get("names")?.value;
          this.user.lastNames=<string>this.registerClientFormGroup.get("lastNames")?.value;
          this.user.address=<string>this.registerClientFormGroup.get("address")?.value;
          this.user.urlToProfile=<string>this.registerClientFormGroup.get("urlToProfile")?.value;
          this.user.cellPhoneNumber=<string>this.registerClientFormGroup.get("cellPhoneNumber")?.value;
          this.user.email=<string>this.registerClientFormGroup.get("email")?.value;
          this.user.password=<string>this.registerClientFormGroup.get("password")?.value;
          this.user.planType="None";
          this.clientsService.create(this.user).subscribe((response3: any)=>{
            this.route.navigate(['/client',response3.id,'client-profile']);
          })
        })

      })
    }
}

}
