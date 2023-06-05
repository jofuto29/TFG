import { Component} from '@angular/core';
import { supplier } from 'src/app/models/supplier';
import { Router} from '@angular/router';
import { crudService } from 'src/app/services/crudService';

@Component({
  selector: 'app-supplier-regiter',
  templateUrl: './supplier-regiter.component.html',
  styleUrls: ['./supplier-regiter.component.css'],
  providers: [crudService]
})
export class SupplierRegiterComponent{
  public supplierData: supplier;
  public status: string;
  public identity: any;
  public token: any;

  constructor(
    private _crudService: crudService,
    private _router: Router
  ){
    this.status = "";
    this.supplierData = new supplier(1," "," "," ",0, 0, "", "", "");
    this.loadUser();
  }

  loadUser() {
    this.identity = this._crudService.getIdentity();
    this.token = this._crudService.getToken();
  }

  onSubmit(form: any){
    this._crudService.registerObject(this.token, "supplier", this.supplierData).subscribe(  //el metodo subscribe viene por el tipo observable que hemos declarado en el servicio
      (response) => {
        console.log(response);
        this.status = "success";
        this._router.navigate(['suppliers']);
      },
      (error) => {
        // Manejar el error aquí
        console.error(error);
        this.status = "error";
      }
    );
  }
}
