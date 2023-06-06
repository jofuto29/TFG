import { Component} from '@angular/core';
import { reparation } from 'src/app/models/reparation';
import { Router} from '@angular/router';
import { crudService } from 'src/app/services/crudService';

@Component({
  selector: 'app-reparation-register',
  templateUrl: './reparation-register.component.html',
  styleUrls: ['./reparation-register.component.css'],
  providers: [crudService]
})
export class ReparationRegisterComponent {
  public reparationData: reparation;
  public vehicles: any[] = []; // Array para almacenar los vehiculos


  public status: string;
  public identity: any;
  public token: any;

  constructor(
    private _crudService: crudService,
    private _router: Router
  ){
    this.status = "";
    this.reparationData = new reparation(1,1,new Date(),new Date(),"","","", "","");
    this.loadUser();
    this.listVehicles();
  }

  loadUser() {
    this.identity = this._crudService.getIdentity();
    this.token = this._crudService.getToken();
  }

  onSubmit(form: any){
    this._crudService.registerObject(this.token, "reparation", this.reparationData).subscribe(  //el metodo subscribe viene por el tipo observable que hemos declarado en el servicio
      (response) => {
        console.log(response);
        this.status = "success";
        this._router.navigate(['reparations']);
      },
      (error) => {
        // Manejar el error aquí
        console.error(error);
        this.status = "error";
      }
    );
  }

  listVehicles() {
    this._crudService.listObjects(this.token, 'vehicle').subscribe(
      (response) => {
        // Manejar la respuesta exitosa aquí --> la imagen ha sido subida
        
        this.vehicles = [...response.$model]; // Asignar la respuesta al array de productos
        console.log("informacion vehiculos: ");
        console.log(this.vehicles);
      },
      (error) => {
        // Manejar el error aquí
        console.error(error);
      }
    );
  }
}
