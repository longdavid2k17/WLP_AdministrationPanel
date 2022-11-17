import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { RoleService } from 'src/app/services/role.service';
import { UserService } from 'src/app/services/user.service';
import { AccountDisableFormComponent } from '../account-disable-form/account-disable-form.component';
import { RolesManagmentComponent } from '../roles-managment/roles-managment.component';
import { SendMailComponent } from '../send-mail/send-mail.component';
import { UserPreviewComponent } from '../user-preview/user-preview.component';

export interface UserData {
  id: string;
  name: string;
  lastName: string;
  email: string;
  username: string;
  active: boolean;
  roles: any[];
}

@Component({
  selector: 'app-user-managment',
  templateUrl: './user-managment.component.html',
  styleUrls: ['./user-managment.component.scss']
})
export class UserManagmentComponent implements OnInit {

  displayedColumns: string[] = ['menu','id', 'name', 'lastName', 'email','username','active'];
  sumaryDisplayedColumns: string[] = ['property','value'];
  summaryDataSource: MatTableDataSource<any>;
  dataSourceAll: MatTableDataSource<UserData>;
  dataSourceAdminsModers: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginatorAll: MatPaginator;
  @ViewChild(MatPaginator) paginatorAdminsModers: MatPaginator;
  @ViewChild(MatSort) sortAll: MatSort;
  @ViewChild(MatSort) sortAdminsModers: MatSort;

  allUsers:any[] = [];
  adminModerUsers:any[] = [];
  roleCollection:any[] = [];
  querriedSuccessfully:boolean = false;

  constructor(private userService:UserService,
    private toastrService:ToastrService,
    private roleService:RoleService,
    private dialog:MatDialog) {
  }
  ngOnInit(): void {
    this.querriedSuccessfully = false;
    this.queryAllUsers();
    this.queryModersAndAdmins();
    this.queryStats();
    this.querriedSuccessfully = true;
  }

  queryAllUsers():void {
    this.userService.listUsers().subscribe(res => {
      this.allUsers = res;
      this.dataSourceAll = new MatTableDataSource(this.allUsers);
      this.dataSourceAll.paginator = this.paginatorAll;
      this.dataSourceAll.sort = this.sortAll;
    },error => {
      this.toastrService.error(error.error.message,"Error during querying data!")
    });
  }

  queryStats():void {
    this.userService.getStats().subscribe(res => {
      this.summaryDataSource = new MatTableDataSource(res);
    },error => {
      this.toastrService.error(error.error.message,"Error during querying stats!")
    });
  }

  disableAccount(user:any):void {
    let dialogRef = this.dialog.open(AccountDisableFormComponent, {
      height: '520px',
      width: '800px',
      data: {
        user: user,
      },
      panelClass: 'dialog'
    });
  }

  queryModersAndAdmins():void {
    this.roleService.listRoles().subscribe(res=>{
      const roleArray = res;
      const filteredRoles = roleArray.filter((obj) => {
        return obj.roleName.toLowerCase() != 'role_user';
      });
      const ids = filteredRoles.map(a => a.id);
      this.userService.listUsers(ids).subscribe(res => {
        this.adminModerUsers = res;
        this.dataSourceAdminsModers = new MatTableDataSource(this.adminModerUsers);
        this.dataSourceAdminsModers.paginator = this.paginatorAdminsModers;
        this.dataSourceAdminsModers.sort = this.sortAdminsModers;
      },error => {
        this.toastrService.error(error.error.message,"Error during querying data!")
      });
    },error => {
      this.toastrService.error(error.error.message,"Error during querying role data!")
    });
  }

  previewUser(user:any) :void{
    let dialogRef = this.dialog.open(UserPreviewComponent, {
      height: '520px',
      width: '800px',
      data: {
        user: user,
        editMode:false,
      },
      panelClass: 'dialog'
    });
  }


  sendMail(user:any) :void{
    let dialogRef = this.dialog.open(SendMailComponent, {
      height: '520px',
      width: '800px',
      data: {
        user: user,
      },
      panelClass: 'dialog'
    });
  }

  manageRoles(user:any) :void{
    let dialogRef = this.dialog.open(RolesManagmentComponent, {
      height: '520px',
      width: '800px',
      data: {
        user: user,
      },
      panelClass: 'dialog'
    });
  }


  applyFilterAll(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceAll.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceAll.paginator) {
      this.dataSourceAll.paginator.firstPage();
    }
  }

  applyFilterAdminModers(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceAdminsModers.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceAdminsModers.paginator) {
      this.dataSourceAdminsModers.paginator.firstPage();
    }
  }
  
}