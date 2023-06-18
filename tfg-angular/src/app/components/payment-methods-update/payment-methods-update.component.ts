import { Component, OnInit } from '@angular/core';
import { paymentMethod } from 'src/app/models/paymentMethod';
import { crudService } from 'src/app/services/crudService';
import { Router, ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-payment-methods-update',
  templateUrl: './payment-methods-update.component.html',
  styleUrls: ['./payment-methods-update.component.css'],
  providers:[crudService]
})

export class PaymentMethodsUpdateComponent implements OnInit{
  public methodData: paymentMethod;

  public status: string;
  public identity: any;
  public token: any;
  public methodId: number = 0;

  public users: any[] = []; // Array para almacenar las categorias

  constructor(
    private _crudService: crudService,
    private _router: Router,
    private _route: ActivatedRoute
  ){
    this.status = "";
    this.methodData = new paymentMethod(1,1,"","","","/","","");
    this.loadUser();
  }

  ngOnInit(): void {
    this.methodId = this._route.snapshot.queryParams['id'];
    this.getMethod();
  }

  getMethod(){
    this._crudService.getObject(this.token, 'paymentMethod/', this.methodId).subscribe(
      (response) => {
        // Manejar la respuesta exitosa aquí --> la imagen ha sido subida
        this.methodData = response.$model; // Asignar la respuesta al array de productos
      },
      (error) => {
        // Manejar el error aquí
        console.error(error);
      }
    );
  }
  

  loadUser() {
    this.identity = this._crudService.getIdentity();
    this.token = this._crudService.getToken();
    if(this.identity.rol == "admin"){
      this.listUsers();
    }else{
      this.users[0] = this.identity;
      console.log(this.identity.user);
    }
  }


  onSubmit(form: any){
    this._crudService.updateObject(this.token, "paymentMethod", this.methodData, this.methodId).subscribe(  //el metodo subscribe viene por el tipo observable que hemos declarado en el servicio
      (response) => {
        console.log(response);
        this.status = "success";
        this._router.navigate(['paymentMethod']);
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
}