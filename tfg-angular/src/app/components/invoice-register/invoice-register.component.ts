import { Component} from '@angular/core';
import { invoices } from 'src/app/models/invoice';
import { Router} from '@angular/router';
import { crudService } from 'src/app/services/crudService';
import { invoiceDeductions } from 'src/app/models/invoiceDeductions';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-invoice-register',
  templateUrl: './invoice-register.component.html',
  styleUrls: ['./invoice-register.component.css'],
  providers: [crudService]
})
export class InvoiceRegisterComponent {
  public invoiceData: invoices;
  public status: string;
  public identity: any;
  public token: any;
  public today = new Date();
  public reparations: any[] = []; // Array para almacenar los suppliers
  public products: any[] = []; // Array para almacenar los suppliers
  public services: any[] = []; // Array para almacenar los suppliers

  public deductions: any[] = []; // Array para almacenar los suppliers
  public selectedDeductions: any[] = []; // Array para almacenar los suppliers
  public addedDeductions: any[] = []; // Array para almacenar los suppliers
  public reparationServices: any[] = []; // Array para almacenar los suppliers
  public reparationProducts: any[] = []; // Array para almacenar los suppliers

  public stateOptions = ["Paid","Unpaid"];

  constructor(
    private _crudService: crudService,
    private _router: Router
  ){
  this.status = "";
  this.invoiceData = new invoices(1,1,this.today,0,"unpaid", "", "");
  this.loadUser();
  this.listReparations();
  this.listDeductions();
  this.listProducts();
  this.listServices();
}

loadUser() {
  this.identity = this._crudService.getIdentity();
  this.token = this._crudService.getToken();
}

updateRegister(){
  this._crudService.registerObject(this.token, "invoice", this.invoiceData).subscribe(  //el metodo subscribe viene por el tipo observable que hemos declarado en el servicio
    (response) => {

      /*Añadimos los productos asociados --> si utilizamos let o var o variable global en cada iteracion siempre apuntara a la misma direccion no se crearan objeto nuevos*/
      for(let i = 0; i < this.addedDeductions.length; i++){
        const invoiceDeductionData = new invoiceDeductions(1, response.data.id_invoice, this.addedDeductions[i].id_deduction, "", "");
        this._crudService.registerObject(this.token, "invoiceDeductions", invoiceDeductionData).subscribe(
          (response) => {
            console.log(response);
          },
          (error) => {
            console.error(error);
          }
        );
      }

      this.status = "success";
      this._router.navigate(['invoices']);
    },
    (error) => {
      // Manejar el error aquí
      console.error(error);
      this.status = "error";
    }
  );
}

listReparations(){
  this._crudService.listObjects(this.token, 'reparation').subscribe(
    (response) => {
      // Manejar la respuesta exitosa aquí --> la imagen ha sido subida
      this.reparations = [...response.$model]; // Asignar la respuesta al array de productos
    },
    (error) => {
      // Manejar el error aquí
      console.error(error);
    }
  );
}

listDeductions(){
  this._crudService.listObjects(this.token, 'deduction').subscribe(
    (response) => {
      // Manejar la respuesta exitosa aquí --> la imagen ha sido subida
      this.deductions = [...response.$model]; // Asignar la respuesta al array de productos
    },
    (error) => {
      // Manejar el error aquí
      console.error(error);
    }
  );
}

listProducts(){
  this._crudService.listObjects(this.token, 'product').subscribe(
    (response) => {
      this.products = [...response.$model]; // Asignar la respuesta al array de productos
    },
    (error) => {
      // Manejar el error aquí
      console.error(error);
    }
  );
}

listServices(){
  this._crudService.listObjects(this.token, 'service').subscribe(
    (response) => {
      this.services = [...response.$model]; // Asignar la respuesta al array de productos
    },
    (error) => {
      // Manejar el error aquí
      console.error(error);
    }
  );
}

removeDeduction(i:number){
  this.selectedDeductions.splice(i,1);
  const removedService = this.addedDeductions.splice(i, 1);
  this.deductions.push(removedService[0]);
}

addDeduction() {
  const lastSelectedProductId = this.selectedDeductions[this.selectedDeductions.length - 1];
  const lastSelectedProductIndex = this.deductions.findIndex(deduction => deduction.id_deduction === lastSelectedProductId);//se obtiene la posicion del elemento en el array

  if (lastSelectedProductIndex !== -1) {
    const lastSelectedProduct = this.deductions.splice(lastSelectedProductIndex, 1)[0];//elimina el elemnto en esa posicion y lo guarda en lastSelectproduct
    this.addedDeductions.push(lastSelectedProduct);//lo añade a porducto selecionados
  }
}

/*calcular precio de la facturta
getPrice(){
  /*necesitamos productos asociados a la reparacion junto con sus cantidades
  this._crudService.getObject(this.token, "reparationServices/findByCamp/", this.invoiceData.id_reparation).subscribe(
    (response) => {
      /*obtenemos los servicios asociados
      this.reparationServices = response.$model;

      //iteramos entre los servicios obtenidos
      this.reparationServices.forEach((reparationService) => {
        const filteredService = this.services.find((service) => service.id_service === reparationService.id_service);
        if (filteredService) {
          this.invoiceData.totalPrice += filteredService.price;
        }
      });
    },
    (error) => {
      console.error(error);
    }
  );

  /*Servicios asociados junto con sus precios
  this._crudService.getObject(this.token, "reparationProducts/findByCamp/", this.invoiceData.id_reparation).subscribe(
    (response) => {
      this.reparationProducts = response.$model;

      this.reparationProducts.forEach((reparationProduct) => {
        const filteredProduct = this.products.find((product) => product.id_product === reparationProduct.id_product);
        if (filteredProduct) {
          this.invoiceData.totalPrice += filteredProduct.price * reparationProduct.quantity;
        }
      });
    });

  /*aplicar impuesto o rebaja
  for(let i = 0; i < this.addedDeductions.length; i++){
    if(this.addedDeductions[i].isdeduction){
      const deduction = this.invoiceData.totalPrice * this.addedDeductions[i].percentage/100;
      this.invoiceData.totalPrice -= deduction;
    }else{
      const impuesto = this.invoiceData.totalPrice * this.addedDeductions[i].percentage/100;
      this.invoiceData.totalPrice += impuesto;
    }
  }

  console.log(this.invoiceData.totalPrice);
}
*/


onSubmit(form: any){
  const observables = [];

  observables.push(this._crudService.getObject(this.token, "reparationServices/findByCamp/", this.invoiceData.id_reparation));
  observables.push(this._crudService.getObject(this.token, "reparationProducts/findByCamp/", this.invoiceData.id_reparation));

  forkJoin(observables).subscribe(
    (responses) => {

      console.log("Response:", responses);

      const responseServices = responses[0];
      const responseProducts = responses[1];

      this.reparationServices = responseServices.$model;
      this.reparationProducts = responseProducts.$model;

      // Calcular el precio de los servicios
      this.reparationServices.forEach((reparationService) => {
        const filteredService = this.services.find((service) => service.id_service === reparationService.id_service);
        console.log(filteredService);
        if (filteredService) {
          this.invoiceData.totalPrice += Number(filteredService.price);
          console.log(this.invoiceData.totalPrice);
        }
      });

      // Calcular el precio de los productos
      this.reparationProducts.forEach((reparationProduct) => {
        const filteredProduct = this.products.find((product) => product.id_product === reparationProduct.id_product);
        console.log(filteredProduct);
        if (filteredProduct) {
          this.invoiceData.totalPrice += Number(filteredProduct.price) * Number(reparationProduct.quantity);
          console.log(this.invoiceData.totalPrice);
        }
      });

      // Aplicar impuestos o descuentos
      for (let i = 0; i < this.addedDeductions.length; i++) {
        if (this.addedDeductions[i].isdeduction) {
          const deduction = this.invoiceData.totalPrice * Number(this.addedDeductions[i].percentage / 100);
          this.invoiceData.totalPrice -= deduction;
        } else {
          const impuesto = this.invoiceData.totalPrice * Number(this.addedDeductions[i].percentage / 100);
          this.invoiceData.totalPrice += impuesto;
        }
      }

      console.log(this.invoiceData.totalPrice);

      // Invocar registerObject después de completar el cálculo del precio
      this.updateRegister();
    },
    (error) => {
      console.error(error);
    }
  );
}

}
