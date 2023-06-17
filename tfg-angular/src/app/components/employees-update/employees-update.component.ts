import { Component, OnInit } from '@angular/core';
import { Employeer } from 'src/app/models/employeer';
import { crudService } from 'src/app/services/crudService';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-employees-update',
  templateUrl: './employees-update.component.html',
  styleUrls: ['./employees-update.component.css'],
  providers: [crudService]
})
export class EmployeesUpdateComponent implements OnInit{

    public page_title: string;
    public status: string;

    public employeeData: Employeer;
    public identity: any;
    public token: any;
    public employeerId:number = 0;

    constructor(
      private _crudService: crudService,
      private _router: Router,
      private _route: ActivatedRoute
    ){

      this.page_title = "Actualiza un empleado";
      this.status = "";
      this.employeeData = new Employeer(1,1,"","","","");
      this.loadUser();
    }

    ngOnInit(){//se lanzaran nada mas cargar la pagina
      this.employeerId = this._route.snapshot.queryParams['id'];
      this.loadEmployeer();
    }

    onSubmit(form: any){
      //registramos el numero usuario
      this._crudService.registerObject(this.token, "employee", this.employeeData).subscribe(  //el metodo subscribe viene por el tipo observable que hemos declarado en el servicio
          (response) => {
            console.log(response);
            this.status = "success";
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

    loadEmployeer(){
      this._crudService.getObject(this.token, "employee/findByCamp/", this.employeerId).subscribe(  //el metodo subscribe viene por el tipo observable que hemos declarado en el servicio
          (response) => {
            const empleados = [...response.$model]
            this.employeeData = empleados[0];
            console.log(this.employeeData);
          },
          (error) => {
            console.error(error);
          }
        );
    }
}
