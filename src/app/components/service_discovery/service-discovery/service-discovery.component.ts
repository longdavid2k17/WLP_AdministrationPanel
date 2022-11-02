import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ServiceDiscoveryService } from 'src/app/services/service-discovery.service';
import { saveAs } from 'file-saver';
import { MatDialog } from '@angular/material/dialog';
import { LogManagerComponent } from '../../log-manager/log-manager.component';

export interface PeriodicElement {
  name: string;
  port: string;
  hostAddress: string;
  moduleVersion: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {port: "8001", name: 'SERVICE_DISCOVERY_MODULE', hostAddress: "192.168.1.100", moduleVersion: '0.0.2-FINAL'},
  {port: "8091", name: 'MAILING_MODULE', hostAddress: "192.168.1.100", moduleVersion: '0.0.2-FINAL'},
  {port: "8000", name: 'AUTHORIZATION_MODULE', hostAddress: "192.168.1.100", moduleVersion: '0.0.2-FINAL'},
  {port: "8002", name: 'RESOURCE_MODULE', hostAddress: "192.168.1.100", moduleVersion: '0.0.1-PREVIEW'},
];

@Component({
  selector: 'app-service-discovery',
  templateUrl: './service-discovery.component.html',
  styleUrls: ['./service-discovery.component.scss']
})
export class ServiceDiscoveryComponent implements OnInit {

  displayedColumns: string[] = ['port', 'name', 'hostAddress', 'moduleVersion'];
  dataSource = ELEMENT_DATA;

  modules: any[] = [];
  queryDate:Date = new Date();
  querriedSuccessfully:boolean = false;

  constructor(private serviceDiscoveryService:ServiceDiscoveryService,
              private toastrService:ToastrService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.queryServiceDiscovery();
  }

  queryServiceDiscovery() : void {
    this.querriedSuccessfully = false;
    this.serviceDiscoveryService.getServiceDiscovery().subscribe(res => {
      this.modules = res;
      this.queryDate = new Date();
      this.querriedSuccessfully=true;
    },error => {
      this.toastrService.error(error.error.message,"Error durring querying data");
      this.querriedSuccessfully=true;
    });
  }

  applyFilter(x: any) {
    const searchString = x.target.value; 
    if(searchString && searchString.length){
      this.querriedSuccessfully = false;
      this.serviceDiscoveryService.filterServiceDiscovery(searchString).subscribe(res => {
        this.modules = res;
        this.queryDate = new Date();
        this.querriedSuccessfully=true;
      },error => {
        this.toastrService.error(error.error.message,"Error durring querrying");
        this.querriedSuccessfully=true;
      });
    }
    else this.queryServiceDiscovery();
  }

  exportConfiguration(module:any):void {
    this.serviceDiscoveryService.getConfigurationJson(module.moduleName).subscribe(response => {
			let blob:any = new Blob([response], { type: 'text/json; charset=utf-8' });
			const url = window.URL.createObjectURL(blob);
			//window.open(url);
			saveAs(blob, module.moduleName+'_configuration.json');
			}, error => {
        this.toastrService.error(error.error.message,"Error durring exporting configuration");
      });
  }

  refreshModuleState(module:any):void {
    this.querriedSuccessfully = false;
    this.serviceDiscoveryService.refreshModuleState(module.moduleName).subscribe(res => {
      var index = this.modules.indexOf(module);
      if (index !== -1) {
          this.modules[index] = res;
      }
      module = res;
      this.querriedSuccessfully = true;
    },error => {
      this.toastrService.error(error.error.message,"Error durring querrying");
      this.querriedSuccessfully = true;
    });
  }

  openLogWindow(module:any):void {
    let dialogRef = this.dialog.open(LogManagerComponent, {
      height: '500px',
      width: '800px',
      data: {
        module: module.moduleName,
      },
      panelClass: 'dialog'
    });
  }
}
