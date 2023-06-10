import { Component } from '@angular/core';
import { crudService } from 'src/app/services/crudService';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css'],
  providers: [crudService]
})
export class InvoiceComponent {
  public token: any;
  public identity: any;
  public invoices: any[] = []; // Array para almacenar los productos

  constructor(
    private _crudService: crudService
  ) {
    this.loadUser();
  }

  ngOnInit(): void {
    this.listInvoices();
  }

  listInvoices() {
    this._crudService.listObjects(this.token, 'invoice').subscribe(
      (response) => {
        // Manejar la respuesta exitosa aquí --> la imagen ha sido subida
        this.invoices = [...response.$model]; // Asignar la respuesta al array de productos
      },
      (error) => {
        // Manejar el error aquí
        console.error(error);
      }
    );
  }

  deleteInvoice(id_supplier: number) {
    this._crudService.deleteObject(this.token,'invoice/',id_supplier).subscribe(
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

  getStateClass(state: string): string {
    switch (state) {
      case 'Unpaid':
        return 'state-red'; // Clase CSS para estado Standby en rojo
      case 'Progress':
        return 'state-orange'; // Clase CSS para estado Progress en naranja
      case 'Paid':
        return 'state-green'; // Clase CSS para estado Complete en verde
      default:
        return ''; // Clase CSS predeterminada si el estado no coincide con ninguna opción
    }
  }
}
