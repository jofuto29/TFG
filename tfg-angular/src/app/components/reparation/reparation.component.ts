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
  public invoices: any[] = []; // Array para almacenar los id productos
  public vehicles: any[] = []; // Array para almacenar los id productos

  constructor(
    private _crudService: crudService
  ) {
    this.loadUser();
  }

  ngOnInit(): void {
    if(this.identity.rol == "admin"){
      this.listReparations();
    }else{
      this.listVehiclesUsers()
    }
  }

  listVehiclesUsers() {
    this._crudService.getObject(this.token, 'vehicle/findByCamp/', this.identity.sub).subscribe(
      (response) => {
        // Manejar la respuesta exitosa aquí --> la imagen ha sido subida
        this.vehicles = [...response.$model]; // Asignar la respuesta al array de productos
        this.listReparationClient();
      },
      (error) => {
        // Manejar el error aquí
        console.error(error);
      }
    );
  }

  listReparationClient(){
    for(let i = 0; i < this.vehicles.length; i++){
      this._crudService.getObject(this.token, 'reparation/findByCamp/',this.vehicles[i].id_vehicle).subscribe(
        (response) => {
          this.reparations = [...response.$model];
        },
        (error) => {
          console.error(error);
        }
      );
    }
    
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
              this.deleteInvoice(reparationId);
            },
            (error) => {
              console.error(error);
            }
          );
        } else {
          this.deleteInvoice(reparationId);
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }

  deleteInvoice(reparationId: number){
    this._crudService.getObject(this.token, "invoice/findByCamp/", reparationId).subscribe(
      (response) => {
        this.invoices = response.$model;
        if (this.invoices.length !== 0) {
          const deleteInoviceRequests = this.invoices.map(invoice => {
            return this._crudService.deleteObject(this.token, "invoice/", invoice.id_invoice);
          });

          forkJoin(deleteInoviceRequests).subscribe(
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
