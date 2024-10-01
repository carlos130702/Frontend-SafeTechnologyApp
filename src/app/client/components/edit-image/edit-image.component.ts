import {Component, Inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Client} from "../../interfaces/client";

@Component({
  selector: 'app-edit-image',
  templateUrl: './edit-image.component.html',
  styleUrls: ['./edit-image.component.css']
})
export class EditImageComponent {
  editImageProfileFormGroup= new FormGroup({
    urlToProfile: new FormControl('',[Validators.required,Validators.minLength(6)]),
  });

  constructor(
    public dialogRef: MatDialogRef<EditImageComponent>,
    @Inject(MAT_DIALOG_DATA) public  data: Client,
  ){
    this.editImageProfileFormGroup.setValue({
      urlToProfile:data.profileImageUrl,
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
