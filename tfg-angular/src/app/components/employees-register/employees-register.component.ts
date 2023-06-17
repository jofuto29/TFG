import { Component, OnInit } from '@angular/core';
import { Employeer } from 'src/app/models/employeer';
import { user } from 'src/app/models/user';
import { crudService } from 'src/app/services/crudService';
import { Router} from '@angular/router';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-employees-register',
  templateUrl: './employees-register.component.html',
  styleUrls: ['./employees-register.component.css'],
  providers: [crudService, UserService]
})
export class EmployeesRegisterComponent implements OnInit{

    public page_title: string;
    public status: string;
    public users: any[] = [];
    public userData: user;

    public employeeData: Employeer;
    public identity: any;
    public token: any;

    constructor(
      private _crudService: crudService,
      private _router: Router,
      private _userService: UserService
    ){
      this.page_title = "Registrate";
      this.status = "";
      this.employeeData = new Employeer(1,1,"","","","");
      this.userData = new user(1,'','','','','user',2,'',2,'','','');//e rellaran lso datos con forme lo enviamos desde el formulario
      this.loadUser();
    }

    ngOnInit(){//se lanzaran nada mas cargar la pagina
      this.listUsers();
    }

    onSubmit(form: any){
      //registramos el numero usuario
      this._crudService.registerObject(this.token, "employee", this.employeeData).subscribe(  //el metodo subscribe viene por el tipo observable que hemos declarado en el servicio
          (response) => {
            console.log(response);
            this.status = "success";

            this._crudService.getObject(this.token,"user/detailsUser/", this.employeeData.id_user).subscribe(
              response =>{
                this.userData = response.$model;
                this.userData.rol = "employeer";

                this._userService.update(this.token,this.userData).subscribe(
                  response =>{
                    console.log("OK");
                    console.log(response);
                    this._router.navigate(['/employeer']);
                  },
                  error=>{
                    this.status = 'error';
                    console.log(<any>error);
                  }
                );
              },
              error=>{
                console.log(<any>error);
              }
            );
          },
          (error) => {
            // Manejar el error aquí
            console.error(error);
            this.status = "error";
          }
        );
        
    }
      
    loadUser() {
      this.identity = this._crudService.getIdentity();
      this.token = this._crudService.getToken();
    }

    listUsers(){
      this._crudService.listObjects(this.token, 'user/listUsers').subscribe(
        (response) => {
          this.users = [...response.$model]; // Asignar la respuesta al array de productos
        },
        (error) => {
          console.error(error);
        }
      );
    }

    getUser(id_user:number){
      this._crudService.getObject(this.token,"user/detailsUser/", id_user).subscribe(
        response =>{
          this.userData = response.$model;
          console.log(this.userData);
        },
        error=>{
          console.log(<any>error);
        }
      );
    }
}

