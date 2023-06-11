import { Component} from '@angular/core';
import { invoices } from 'src/app/models/invoice';
import { Router} from '@angular/router';
import { crudService } from 'src/app/services/crudService';
import { invoiceDeductions } from 'src/app/models/invoiceDeductions';

@Component({
  selector: 'app-invoice-update',
  templateUrl: './invoice-update.component.html',
  styleUrls: ['./invoice-update.component.css'],
  providers: [crudService]
})
export class InvoiceUpdateComponent {

  public invoiceData: invoices;
  public status: string;
  public identity: any;
  public token: any;
  public today = new Date();
  public reparations: any[] = []; // Array para almacenar los suppliers
  public deductions: any[] = []; // Array para almacenar los suppliers
  public selectedDeductions: any[] = []; // Array para almacenar los suppliers
  public addedDeductions: any[] = []; // Array para almacenar los suppliers

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
}

loadUser() {
  this.identity = this._crudService.getIdentity();
  this.token = this._crudService.getToken();
}

onSubmit(form: any){
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
}
