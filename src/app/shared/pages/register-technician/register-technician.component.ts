import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, FormControl, Validators} from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import {Router} from "@angular/router";
import {TechniciansService} from "../../../technician/services/technicians.service";
import {Technician} from "../../../technician/interfaces/technician";
import {UsersService} from "../../services/users.service";

@Component({
  selector: 'app-register-technician',
  templateUrl: './register-technician.component.html',
  styleUrls: ['./register-technician.component.css']
})
export class RegisterTechnicianComponent implements OnInit{
  user2:Technician;

  registerTechnicianFormGroup= new FormGroup({
    username: new FormControl('',[Validators.required,Validators.minLength(6),Validators.maxLength(15)]),
    names: new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(15)]),
    lastNames: new FormControl('',[Validators.required,Validators.minLength(2),Validators.maxLength(15)]),
    address: new FormControl('',[Validators.required,Validators.minLength(4)]),
    urlToProfile: new FormControl('',[Validators.required,Validators.minLength(4)]),
    cellPhoneNumber: new FormControl('',[Validators.required, Validators.pattern("^(9)([0-9]){8}$")]),
    email: new FormControl('',[Validators.required,
      Validators.email]),
    password: new FormControl('',[Validators.required,
      Validators.minLength(6)])
  });

  constructor(private fb:FormBuilder,private http:HttpClient,private router:Router,private techniciansService:TechniciansService,
              private usersService: UsersService)
  {
    this.user2={}as Technician;
  }

  ngOnInit(): void {
  }
  SubmitRegisterTechnician() {
    let role: string[] = ["ROLE_TECHNICIAN"];
    this.usersService.registerUser({
      username: this.registerTechnicianFormGroup.get('username')?.value,
      email: this.registerTechnicianFormGroup.get('email')?.value,
      password: this.registerTechnicianFormGroup.get('password')?.value,
      roles: role
    }).subscribe((response: any) => {
      console.log(response);
      this.usersService.authenticateUser({
        username: this.registerTechnicianFormGroup.get('username')?.value,
        password: this.registerTechnicianFormGroup.get('password')?.value
      }).subscribe((response2: any)=>{
        console.log(response2);
        localStorage.setItem('token',response2.token);
        this.user2.username=<string>this.registerTechnicianFormGroup.get("username")?.value;
        this.user2.firstName=<string>this.registerTechnicianFormGroup.get("names")?.value;
        this.user2.lastName=<string>this.registerTechnicianFormGroup.get("lastNames")?.value;
        this.user2.address=<string>this.registerTechnicianFormGroup.get("address")?.value;
        this.user2.profileImageUrl=<string>this.registerTechnicianFormGroup.get("urlToProfile")?.value;
        this.user2.phoneNumber=<string>this.registerTechnicianFormGroup.get("cellPhoneNumber")?.value;
        this.user2.email=<string>this.registerTechnicianFormGroup.get("email")?.value;
        this.user2.password=<string>this.registerTechnicianFormGroup.get("password")?.value;
        this.techniciansService.create(this.user2).subscribe((response3: any)=>{
          this.router.navigate(['/technician',response3.id,'technician-profile']);
          console.log(response3);
        })
      })

    })
}
}
