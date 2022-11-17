import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-management-preview',
  templateUrl: './user-management-preview.component.html',
  styleUrls: ['./user-management-preview.component.scss']
})
export class UserManagementPreviewComponent implements OnInit {

  querriedSuccessfully:boolean = false;
  sumaryDisplayedColumns: string[] = ['property','value'];
  summaryDataSource: MatTableDataSource<any>;

  constructor(private userService:UserService,
    private toastrService:ToastrService,) { }

  ngOnInit(): void {
    this.querriedSuccessfully = false;
    this.queryStats();
  }

  queryStats():void {
    this.userService.getStats().subscribe(res => {
      this.summaryDataSource = new MatTableDataSource(res);
      this.querriedSuccessfully = true;
    },error => {
      this.toastrService.error(error.error.message,"Error during querying stats!")
      this.querriedSuccessfully = true;
    });
  };

}
