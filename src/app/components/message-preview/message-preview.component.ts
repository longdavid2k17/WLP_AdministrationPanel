import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-message-preview',
  templateUrl: './message-preview.component.html',
  styleUrls: ['./message-preview.component.scss']
})
export class MessagePreviewComponent implements OnInit {

  content:any;
  message:any;
  mode:any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,) {
    if(data.message && data.mode){
      this.message = data.message;
      this.mode = data.mode;
      this.content = this.message.content;
    }
   }

  ngOnInit(): void {
  }

}
