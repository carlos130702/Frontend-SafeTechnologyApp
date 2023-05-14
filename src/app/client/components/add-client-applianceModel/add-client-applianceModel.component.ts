import {Component} from "@angular/core";
import { MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-add-client-applianceModel',
  templateUrl: './add-client-applianceModel.component.html',
  styleUrls: ['./add-client-applianceModel.component.css']
})
export class AddClientApplianceModelComponent {
  applianceModelFormGroup= new FormGroup({
    name: new FormControl('',[Validators.required]),
    model: new FormControl('',[Validators.required]),
    urlToImage: new FormControl('',[Validators.required]),
  });

  constructor(
    public dialogRef: MatDialogRef<AddClientApplianceModelComponent>)
  {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
