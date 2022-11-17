import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { MailService } from 'src/app/services/mail.service';

@Component({
  selector: 'app-send-mail',
  templateUrl: './send-mail.component.html',
  styleUrls: ['./send-mail.component.scss']
})
export class SendMailComponent implements OnInit {
  containsHTMLMarkdows = false;

  form: FormGroup = this.fb.group({
    to: ['', [Validators.required, Validators.email]],
    subject: ['', [Validators.required, Validators.required]],
    text: ['', [Validators.required, Validators.required]]
  });

  user:any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  private fb : FormBuilder,
  private toastrService:ToastrService,
  private mailService:MailService,
  public dialog: MatDialog) {
    if(data.user){
      this.user = data.user;
      this.form.patchValue({'to':this.user.email});
    }
   }


  send():void{
    const formValue = this.form.value;
    if(this.containsHTMLMarkdows){
      this.mailService.sendHTMLMessage(formValue).subscribe(res=>{
        this.toastrService.success("Message sent sucessfully!");
        setTimeout(() =>{
          this.dialog.closeAll();
        },2000);
      },error => {
        this.toastrService.error(error.error.message,"Cannot send message!");
      })
    } else {
      this.mailService.sendMessage(formValue).subscribe(res=>{
        this.toastrService.success("Message sent sucessfully!");
        setTimeout(() =>{
          this.dialog.closeAll();
        },2000);
      },error => {
        this.toastrService.error(error.error.message,"Cannot send message!");
      });
    }
    
  }

  onContainsHTMLMarkdowsChange(event:any){
    this.containsHTMLMarkdows = event.checked;
  }

  ngOnInit(): void {
  }

}
