import { Component, OnInit } from '@angular/core';
import { crudService } from 'src/app/services/crudService';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reparation-servicios-asociados',
  templateUrl: './reparation-servicios-asociados.component.html',
  styleUrls: ['./reparation-servicios-asociados.component.css'],
  providers:[crudService]
})
export class ReparationServiciosAsociadosComponent {
  public status: string;
  public identity: any;
  public token: any;
  public reparationId: Number;
  public reparationServices: any[] = []; // Array para almacenar los id productos
  public asociatedServices: any[] = []; // Array para almacenar los productos

  constructor(
    private _crudService: crudService,
    private _route: ActivatedRoute
  ){
    this.status = "";
    this.reparationId = 0;
    this.loadUser();
  }

  ngOnInit(): void {
    this.reparationId = this._route.snapshot.queryParams['id'];
    this.reparationServicesList();
  }

  loadUser() {
    this.identity = this._crudService.getIdentity();
    this.token = this._crudService.getToken();
  }

  reparationServicesList(){
    this._crudService.getObject(this.token, "reparationServices/findByCamp/", this.reparationId).subscribe(
      (response) => {
        this.reparationServices = response.$model;
        console.log(this.reparationServices);
        for (var i = 0; i < this.reparationServices.length; i++) {
          this._crudService.getObject(this.token, "service/", this.reparationServices[i].id_service).subscribe(
            (response) => {
              this.asociatedServices.push(response.$model);
            },
            (error) => {
              console.error(error);
            }
          );
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }

  deleteService(productId: number) {
    this._crudService.deleteObject(this.token,'product/',productId).subscribe(
      (response) => {
        window.location.reload();
      },
      (error) => {
        console.error(error);
      }
    );
  }

}
