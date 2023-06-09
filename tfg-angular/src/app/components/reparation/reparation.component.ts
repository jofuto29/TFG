import { Component, OnInit } from '@angular/core';
import { crudService } from 'src/app/services/crudService';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-reparation',
  templateUrl: './reparation.component.html',
  styleUrls: ['./reparation.component.css'],
  providers: [crudService]
})
export class ReparationComponent implements OnInit{
  public token: any;
  public identity: any;
  public reparations: any[] = []; // Array para almacenar los productos
  public reparationProducts: any[] = []; // Array para almacenar los id productos
  public reparationServices: any[] = []; // Array para almacenar los id productos

  constructor(
    private _crudService: crudService
  ) {
    this.loadUser();
  }

  ngOnInit(): void {
    this.listReparations();
  }

  listReparations() {
    this._crudService.listObjects(this.token, 'reparation').subscribe(
      (response) => {
        this.reparations = [...response.$model];
      },
      (error) => {
        console.error(error);
      }
    );
  }

  deleteReparation(reparationId: number) {
    //primero borramos en la tabla relacion entre reparacion y servicio
    this._crudService.getObject(this.token, "reparationServices/findByCamp/", reparationId).subscribe(
      (response) => {
        this.reparationServices = response.$model;

        //si la longitud es mallor a 0 procedemos a borrar
        if (this.reparationServices.length !== 0) {
          const deleteServiceRequests = this.reparationServices.map(service => {//creamos un array utilizando el metodo map para iterar sobre todos los objetos dentro de reparation service
            return this._crudService.deleteObject(this.token, "reparationServices/", service.id_reparationServices);//guardamos en deleteService las respuestas
          });
  
          forkJoin(deleteServiceRequests).subscribe(//unimos todas las solicitudes en un mismo obserbable mediante forkjoin para que espere a que todas las solicitudes se haya completado
            (deleteServiceResponses) => {
              this.deleteReparationProducts(reparationId);
            },
            (error) => {
              console.error(error);
            }
          );
        } else {
          this.deleteReparationProducts(reparationId);
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }

  deleteReparationProducts(reparationId: number) {
    this._crudService.getObject(this.token, "reparationProducts/findByCamp/", reparationId).subscribe(
      (response) => {
        this.reparationProducts = response.$model;
        if (this.reparationProducts.length !== 0) {
          const deleteProductRequests = this.reparationProducts.map(product => {
            return this._crudService.deleteObject(this.token, "reparationProducts/", product.id_reparationProducts);
          });

          forkJoin(deleteProductRequests).subscribe(
            (deleteProductResponses) => {
              this.deleteReparationClass(reparationId);
            },
            (error) => {
              console.error(error);
            }
          );
        } else {
          this.deleteReparationClass(reparationId);
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }

  deleteReparationClass(reparationId: number) {
    this._crudService.deleteObject(this.token, 'reparation/', reparationId).subscribe(
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

  getStateClass(state: string): string {
    switch (state) {
      case 'Standby':
        return 'state-red'; // Clase CSS para estado Standby en rojo
      case 'Progress':
        return 'state-orange'; // Clase CSS para estado Progress en naranja
      case 'Complete':
        return 'state-green'; // Clase CSS para estado Complete en verde
      default:
        return ''; // Clase CSS predeterminada si el estado no coincide con ninguna opción
    }
  }

}
