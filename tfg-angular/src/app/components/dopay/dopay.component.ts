import { Component, OnInit } from '@angular/core';
import { pay } from 'src/app/models/pay';
import { invoices } from 'src/app/models/invoice';
import { crudService } from 'src/app/services/crudService';
import { Router, ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-dopay',
  templateUrl: './dopay.component.html',
  styleUrls: ['./dopay.component.css'],
  providers:[crudService]
})

export class DopayComponent implements OnInit{
  public payData: pay;

  public status: string;
  public identity: any;
  public token: any;
  public invoiceId: number = 0;

  public paymentMethods: any[] = []; // Array para almacenar las categorias
  public invoice: invoices;

  constructor(
    private _crudService: crudService,
    private _router: Router,
    private _route: ActivatedRoute
  ){
    this.status = "";
    this.payData = new pay(1,1,1, "", "");
    this.invoice = new invoices(1,1,new Date(),0,"unpaid", "", "");
    this.loadUser();
  }

  ngOnInit(): void {
    this.invoiceId = this._route.snapshot.queryParams['id'];
    this.payData.id_invoice = this.invoiceId;
  }

  loadUser() {
    this.identity = this._crudService.getIdentity();
    this.token = this._crudService.getToken();

    if(this.identity.rol == "admin"){
      this.listPaymentMethods();
    }else{
      this.listPaymentMethodsUser();
    }
  }


  onSubmit(form: any){
    this._crudService.registerObject(this.token, "pay", this.payData).subscribe(  //el metodo subscribe viene por el tipo observable que hemos declarado en el servicio
      (response) => {
        console.log(response);
        //cambiamos estado de la factura

        //obtenemos la factura
        this._crudService.getObject(this.token, 'invoice/', this.invoiceId).subscribe(
          (response) => {
            this.invoice = response.$model;

            //actualizamos el estado
            this.invoice.state = "Paid";
            this._crudService.updateObject(this.token, "invoice/", this.invoice, this.invoiceId).subscribe(  //el metodo subscribe viene por el tipo observable que hemos declarado en el servicio
              (response) => {
                console.log(response);
                this.status = "success";
                this._router.navigate(['invoices']);
              },
              (error) => {
                // Manejar el error aquí
                console.error(error);
                this.status = "error";
              }
            );
          
          },
          (error) => {
            console.error(error);
          }
        );
      
      },
      (error) => {
        console.error(error);
        this.status = "error";
      }
    );
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
    
  
}
