import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { RoleService } from 'src/app/services/role.service';

@Component({
  selector: 'app-roles-managment',
  templateUrl: './roles-managment.component.html',
  styleUrls: ['./roles-managment.component.scss']
})
export class RolesManagmentComponent implements OnInit {
  user:any;
  roles:any[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  private toastrService:ToastrService,
  private roleService:RoleService,
  private dialog:MatDialog) {
    if(data.user){
      this.user = data.user;
    }
  }

  ngOnInit(): void {
    this.roleService.listRoles().subscribe(res=>{
      //this.roles = res;
      this.roles = this.filterRoles(res);
    },error => {
      this.toastrService.error(error.error.message,"Error during querying roles data!")
    });
  }

  filterRoles(avalibleRoles:any[]):any[]{
    let returnArray:any[] = [];
    let userRoles:any[] = this.user.roles;
    for(let item of avalibleRoles){
      let flag:boolean = false;
      for(let userRole of userRoles){
        if(userRole.id === item.id){
          flag=true;
        }
      }
      if(flag != true){
        returnArray.push(item);
      }
    }
    return returnArray;
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  save(): void {
    console.log(this.user.roles);
    const payload = {
      roleCollection : this.user.roles,
      targetUserId : this.user.id
    }
    this.roleService.grantRoles(payload).subscribe(res=>{
      this.toastrService.success("Roles has been granted!");
      setTimeout(() =>{
        this.dialog.closeAll();
      },2000);
    },error=>{
      this.toastrService.error(error.error.message,"Cannot save changes!");
    })
  }

}
