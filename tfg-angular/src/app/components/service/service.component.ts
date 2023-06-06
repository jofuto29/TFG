import { Component, OnInit } from '@angular/core';
import { crudService } from 'src/app/services/crudService';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css'],
  providers: [crudService]
})
export class ServiceComponent implements OnInit {
  public token: any;
  public identity: any;
  public services: any[] = []; // Array para almacenar los productos

  constructor(
    private _crudService: crudService
  ) {
    this.loadUser();
  }

  ngOnInit(): void {
    this.listServices();
  }

  listServices() {
    this._crudService.listObjects(this.token, 'service').subscribe(
      (response) => {
        this.services = [...response.$model];
      },
      (error) => {
        console.error(error);
      }
    );
  }

  deleteService(serviceId: number) {
    this._crudService.deleteObject(this.token,'service/', serviceId).subscribe(
      (response) => {
        window.location.reload();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  loadUser() {
    this.identity = this._crudService.getIdentity();
    this.token = this._crudService.getToken();
  }
}
