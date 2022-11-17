import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { MailService } from 'src/app/services/mail.service';

@Component({
  selector: 'app-account-disable-form',
  templateUrl: './account-disable-form.component.html',
  styleUrls: ['./account-disable-form.component.scss']
})
export class AccountDisableFormComponent implements OnInit {

  containsHTMLMarkdows = false;

  form: FormGroup = this.fb.group({
    username: ['', [Validators.required, Validators.required]],
    deactivationReason: ['', [Validators.required, Validators.required]]
  });

  user:any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  private fb : FormBuilder,
  private toastrService:ToastrService,
  private authorizationService:AuthorizationService,
  public dialog: MatDialog) {
    if(data.user){
      this.user = data.user;
      this.form.patchValue({'username':this.user.username});
    }
   }


  send():void{
    const formValue = this.form.value;

    this.authorizationService.disableAccount(this.user.id, formValue.deactivationReason).subscribe(res=>{
      this.toastrService.success("Account deactivated sucessfully!");
      setTimeout(() =>{
        this.dialog.closeAll();
      },2000);
    },error => {
      this.toastrService.error(error.error.message,"Cannot deactivate account!");
    });
  }

  ngOnInit(): void {
  }

}
