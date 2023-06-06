import { Component} from '@angular/core';
import { services } from 'src/app/models/services';
import { Router} from '@angular/router';
import { crudService } from 'src/app/services/crudService';

@Component({
  selector: 'app-service-register',
  templateUrl: './service-register.component.html',
  styleUrls: ['./service-register.component.css'],
  providers: [crudService]
})
export class ServiceRegisterComponent {
  public serviceData: services;
  public localStatus: string;
  public identity: any;
  public token: any;

  constructor(
    private _crudService: crudService,
    private _router: Router
  ){
    this.localStatus = "";
    this.serviceData = new services(1,"","",0,"",0, "","");
    this.loadUser();
  }

  loadUser() {
    this.identity = this._crudService.getIdentity();
    this.token = this._crudService.getToken();
  }

  onSubmit(form: any){
    this._crudService.registerObject(this.token, "service", this.serviceData).subscribe(  //el metodo subscribe viene por el tipo observable que hemos declarado en el servicio
      (response) => {
        console.log(response);
        this.localStatus = "success";
        this._router.navigate(['services']);
      },
      (error) => {
        // Manejar el error aquí
        console.error(error);
        this.localStatus = "error";
      }
    );
  }
}
