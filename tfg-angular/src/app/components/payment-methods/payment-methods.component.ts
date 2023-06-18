import { Component } from '@angular/core';
import { crudService } from 'src/app/services/crudService';

@Component({
  selector: 'app-payment-methods',
  templateUrl: './payment-methods.component.html',
  styleUrls: ['./payment-methods.component.css'],
  providers: [crudService]
})

export class PaymentMethodsComponent {

  public token: any;
  public identity: any;
  public paymentMethods: any[] = []; // Array para almacenar los productos

  constructor(
    private _crudService: crudService
  ) {
    this.loadUser();
  }

  ngOnInit(): void {
    if(this.identity.rol == "admin"){
      this.listPaymentMethods();     
    }else{
      this.listPaymentMethodsUser();
    }
  }

  listPaymentMethods() {
    this._crudService.listObjects(this.token, 'paymentMethod').subscribe(
      (response) => {
        this.paymentMethods = [...response.$model]; // Asignar la respuesta al array de productos
      },
      (error) => {
        // Manejar el error aquí
        console.error(error);
      }
    );
  }

  listPaymentMethodsUser(){
    this._crudService.getObject(this.token, 'paymentMethod/findByCamp/', this.identity.sub).subscribe(
      (response) => {
        console.log(response);
        this.paymentMethods = [...response.$model]; // Asignar la respuesta al array de productos
      },
      (error) => {
        // Manejar el error aquí
        console.error(error);
      }
    );
  }

  deletePaymentMethod(id_paymentMethod: number) {
    this._crudService.deleteObject(this.token,'paymentMethod/',id_paymentMethod).subscribe(
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
}