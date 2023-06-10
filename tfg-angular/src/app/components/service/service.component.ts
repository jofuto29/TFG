import { Component, OnInit } from '@angular/core';
import { crudService } from 'src/app/services/crudService';
import { forkJoin } from 'rxjs';

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
  public reparationServices: any[] = []; // Array para almacenar los productos

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
    this._crudService.getObject(this.token, "reparationServices/findByCampService/", serviceId).subscribe(
      (response) => {
        this.reparationServices = response.$model;

        //si la longitud es mallor a 0 procedemos a borrar
        if (this.reparationServices.length !== 0) {
          const deleteServiceRequests = this.reparationServices.map(service => {//creamos un array utilizando el metodo map para iterar sobre todos los objetos dentro de reparation service
            return this._crudService.deleteObject(this.token, "reparationServices/", service.id_reparationServices);//guardamos en deleteService las respuestas
          });
  
          forkJoin(deleteServiceRequests).subscribe(//unimos todas las solicitudes en un mismo obserbable mediante forkjoin para que espere a que todas las solicitudes se haya completado
            (deleteServiceResponses) => {
              this.deleteServiceClass(serviceId);
            },
            (error) => {
              console.error(error);
            }
          );
        } else {
          this.deleteServiceClass(serviceId);
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }


  deleteServiceClass(serviceId:number){
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
