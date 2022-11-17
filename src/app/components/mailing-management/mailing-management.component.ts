import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { MessageService } from 'src/app/services/message.service';
import { MatDialog } from '@angular/material/dialog';
import { MessagePreviewComponent } from '../message-preview/message-preview.component';

@Component({
  selector: 'app-mailing-management',
  templateUrl: './mailing-management.component.html',
  styleUrls: ['./mailing-management.component.scss']
})
export class MailingManagementComponent implements OnInit {

  sentMessages:any[]=[];
  inboxMessages:any[]=[];
  querriedSuccessfully:boolean = false;

  inboxDisplayedColumns: string[] = ['menu','date', 'sender', 'subject'];
  inboxDataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) inboxPaginator: MatPaginator;
  @ViewChild(MatSort) inboxSort: MatSort;

  displayedColumns: string[] = ['menu','id', 'notes', 'sendDate', 'targetEmailAddress','topic'];
  sentDataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) sentPaginator: MatPaginator;
  @ViewChild(MatSort) sentSort: MatSort;

  constructor(private messageService:MessageService,
    private toastrService:ToastrService,
    private dialog:MatDialog) { }

  ngOnInit(): void {
    this.querySentMessages();
    this.queryInboxMessages();
  }

  querySentMessages():void{
    this.messageService.getAllSentMessages().subscribe(res=>{
      this.sentMessages = res;
      this.sentDataSource = new MatTableDataSource(this.sentMessages);
      this.sentDataSource.paginator = this.sentPaginator;
      this.sentDataSource.sort = this.sentSort;
    },error =>{
      this.toastrService.error(error.error.message,"Error during querying sent messages!");
    });
  }

  queryInboxMessages():void{
    this.messageService.getAllInboxMessages().subscribe(res=>{
      this.inboxMessages = res;
      this.inboxDataSource = new MatTableDataSource(this.inboxMessages);
      this.inboxDataSource.paginator = this.inboxPaginator;
      this.inboxDataSource.sort = this.inboxSort;
      this.querriedSuccessfully=true;
    },error =>{
      this.toastrService.error(error.error.message,"Error during querying inbox messages!");
      this.querriedSuccessfully=true;
    });
  }

  previewMessage(message:any,mode:string) :void{
    let dialogRef = this.dialog.open(MessagePreviewComponent, {
      height: '520px',
      width: '800px',
      data: {
        message: message,
        mode:mode,
      },
      panelClass: 'dialog'
    });
  }

}
