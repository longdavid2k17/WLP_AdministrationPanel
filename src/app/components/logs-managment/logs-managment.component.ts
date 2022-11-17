import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LogService } from 'src/app/services/log.service';

@Component({
  selector: 'app-logs-managment',
  templateUrl: './logs-managment.component.html',
  styleUrls: ['./logs-managment.component.scss']
})
export class LogsManagmentComponent implements OnInit {
  wrapper:any[];
  content:any = '';
  selectedItem:any;
  constructor(private logService:LogService,
    private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.logService.getWrapper().subscribe(res=>{
      this.wrapper = res;
    },error=>{
      this.toastrService.error(error.error.message,"Error during querying log data wrapper");
    });
  }

  openLog(moduleName:any,filePath: any) {
    this.selectedItem = filePath;
    this.content = '';
    this.logService.readLogFile(moduleName,filePath).subscribe(res=>{
      this.content = res.content;
      this.content = this.content.replace(/(?:\r\n|\r|\n)/g, '\n');
    },error => {
      this.toastrService.error(error.error.message,"Error durring reading of log file");
    })
  }

}
