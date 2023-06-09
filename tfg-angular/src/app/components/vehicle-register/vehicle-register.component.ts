import { Component} from '@angular/core';
import { vehicle } from 'src/app/models/vehicle';
import { user } from 'src/app/models/user';
import { Router} from '@angular/router';
import { crudService } from 'src/app/services/crudService';

@Component({
  selector: 'app-vehicle-register',
  templateUrl: './vehicle-register.component.html',
  styleUrls: ['./vehicle-register.component.css'],
  providers: [crudService]
})
export class VehicleRegisterComponent {
  public vehicleData: vehicle;
  public status: string;
  public identity: any;
  public token: any;

  public users: any[] = [];

  constructor(
    private _crudService: crudService,
    private _router: Router
  ){
    this.status = "";
    this.vehicleData = new vehicle(1,1," "," ","", 0, "", "");
    this.loadUser();

    if(this.identity.rol == "admin"){
      this.listUsers();
    }else{
      let userProp = new user(this.identity.sub,this.identity.user,this.identity.user,"","","",1,"",1,"","","");
      this.users.push(userProp);
    }
    
  }

  loadUser() {
    this.identity = this._crudService.getIdentity();
    this.token = this._crudService.getToken();
  }

  onSubmit(form: any){
   this._crudService.registerObject(this.token, "vehicle", this.vehicleData).subscribe(  //el metodo subscribe viene por el tipo observable que hemos declarado en el servicio
      (response) => {
        this.status = "success";
        if(this.identity.rol == "admin"){
          this._router.navigate(['vehicles']);
        }else{
          this._router.navigate(['vehicleClient']);
        }
      },
      (error) => {
        // Manejar el error aquí
        console.error(error);
        this.status = "error";
      }
    );
  }

  listUsers(){
    this._crudService.listObjects(this.token, 'user/listUsers').subscribe(
      (response) => {
        // Manejar la respuesta exitosa aquí --> la imagen ha sido subida
        this.users = [...response.$model]; // Asignar la respuesta al array de productos
      },
      (error) => {
        // Manejar el error aquí
        console.error(error);
      }
    );
  }

  volver(){
    if(this.identity.rol == "admin"){
      this._router.navigate(['vehicles']);
    }else{
      this._router.navigate(['vehicleClient']);
    }
  }
}
