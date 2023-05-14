import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Client} from "../../../client/interfaces/client";

@Component({
  selector: 'app-edit-image-technician',
  templateUrl: './edit-image-technician.component.html',
  styleUrls: ['./edit-image-technician.component.css']
})
export class EditImageTechnicianComponent{
  editImageProfileFormGroup= new FormGroup({
    urlToProfile: new FormControl('',[Validators.required,Validators.minLength(6)]),
  });

  constructor(
    public dialogRef: MatDialogRef<EditImageTechnicianComponent>,
    @Inject(MAT_DIALOG_DATA) public  data: Client,
  ){
    this.editImageProfileFormGroup.setValue({
      urlToProfile:data.urlToProfile,
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
