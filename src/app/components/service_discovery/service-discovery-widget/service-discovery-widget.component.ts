import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ServiceDiscoveryService } from 'src/app/services/service-discovery.service';

@Component({
  selector: 'app-service-discovery-widget',
  templateUrl: './service-discovery-widget.component.html',
  styleUrls: ['./service-discovery-widget.component.scss']
})
export class ServiceDiscoveryWidgetComponent implements OnInit {

  displayedColumns: string[] = ['moduleName', 'moduleVersion','status'];
  dataSource:any[] = [];
  querriedSuccessfully:boolean = false;
  errorState:boolean = false;
  

  constructor(private serviceDiscoveryService:ServiceDiscoveryService,
    private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.serviceDiscoveryService.getServiceDiscovery().subscribe(res => {
      this.dataSource = res;
      this.querriedSuccessfully = true;
    },error => {
      this.errorState = true;
      this.toastrService.error(error.error.message,"Error durring querying service discovery status");
    });
  }

}
