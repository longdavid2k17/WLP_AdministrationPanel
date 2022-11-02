import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { LogService } from 'src/app/services/log.service';

@Component({
  selector: 'app-log-manager',
  templateUrl: './log-manager.component.html',
  styleUrls: ['./log-manager.component.scss']
})
export class LogManagerComponent implements OnInit {

  moduleName:any;
  fileNames:any[] = [];
  content:any = '';
  selectedItem:any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  private logService:LogService,
  private toastrService:ToastrService) {
    this.moduleName = data.module;
   }

  ngOnInit(): void {
    this.logService.listLogFiles(this.moduleName).subscribe(res => {
      this.fileNames = res;
    },error => {
      this.toastrService.error(error.error.message,"Error durring querying log files");
    });
  }

  openLog(filePath: any) {
    this.selectedItem = filePath;
    this.content = '';
    this.logService.readLogFile(this.moduleName,filePath).subscribe(res=>{
      this.content = res.content;
      this.content = this.content.replace(/(?:\r\n|\r|\n)/g, '\n');
    },error => {
      this.toastrService.error(error.error.message,"Error durring reading of log file");
    })
  }

}
