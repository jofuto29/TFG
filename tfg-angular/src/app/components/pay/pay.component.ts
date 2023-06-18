import { Component } from '@angular/core';
import { crudService } from 'src/app/services/crudService';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.css'],
  providers: [crudService]
})

export class PayComponent {

  public token: any;
  public identity: any;
  public pays: any[] = []; // Array para almacenar los productos
  public paymentMethods: any[] = []; // Array para almacenar los productos

  constructor(
    private _crudService: crudService
  ) {
    this.loadUser();
  }

  ngOnInit(): void {
    if(this.identity.rol == "admin"){
      this.listPays();     
    }else{
      this.listPaysUser();
    }
  }

  listPays() {
    this._crudService.listObjects(this.token, 'pay').subscribe(
      (response) => {
        this.pays = [...response.$model];
      },
      (error) => {
        // Manejar el error aquí
        console.error(error);
      }
    );
  }

  listPaysUser(){

    /*metodos de pago por usuario*/
    this._crudService.getObject(this.token, 'paymentMethod/findByCamp/', this.identity.sub).subscribe(
      (response) => {
        console.log(response);
        this.paymentMethods = [...response.$model];

        for(let i = 0; i < this.paymentMethods.length; i++){
          this._crudService.getObject(this.token, 'pay/findByCamp/', this.paymentMethods[i].id_card).subscribe(
            (response) => {
              console.log(response);
              this.pays = [...response.$model];
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

  deletePay(id_paymentMethod: number) {
    this._crudService.deleteObject(this.token,'pay/',id_paymentMethod).subscribe(
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