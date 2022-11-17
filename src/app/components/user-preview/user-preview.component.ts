import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-preview',
  templateUrl: './user-preview.component.html',
  styleUrls: ['./user-preview.component.scss']
})
export class UserPreviewComponent implements OnInit {
  user:any;
  editMode:boolean = false;

  form: FormGroup = this.fb.group({
    id: ['', [Validators.required, Validators.required]],
    name: ['', [Validators.required, Validators.required]],
    lastName: ['', [Validators.required, Validators.required]],
    username: ['', [Validators.required, Validators.required]],
    email: ['', [Validators.required, Validators.email]],
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  private fb : FormBuilder,
  private toastrService:ToastrService,
  private userService:UserService,
  public dialog: MatDialog) {
    if(data.user){
      this.user = data.user;
      this.form.patchValue(data.user);
    }
    if(data.editMode){
      this.editMode = data.editMode;
    }
   }

  ngOnInit(): void {
  }

  save() : void {
    const toSave = this.form.value;
    this.userService.editUserData(toSave).subscribe(res=>{
      this.toastrService.success("Data saved succesfully!");
      setTimeout(() =>{
        this.dialog.closeAll();
      },2000);
    },error => {
      this.toastrService.error(error.error.message,"Error during saving user data");
    });
  }

  onEditModeChange(event:any):void {
    this.editMode = event.checked;
  }

}
