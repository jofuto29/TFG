import { Component } from '@angular/core';
import { crudService } from 'src/app/services/crudService';

@Component({
  selector: 'app-deductions',
  templateUrl: './deductions.component.html',
  styleUrls: ['./deductions.component.css'],
  providers: [crudService]
})
export class DeductionsComponent {
  public token: any;
  public identity: any;
  public deductions: any[] = []; // Array para almacenar los productos

  constructor(
    private _crudService: crudService
  ) {
    this.loadUser();
  }

  ngOnInit(): void {
    this.listDeductions();
  }

  listDeductions() {
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

  deleteInvoice(id_deduction: number) {
    this._crudService.deleteObject(this.token,'deduction/',id_deduction).subscribe(
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

  getStateClass(isdeduction: number): string {
    switch (isdeduction) {
      case 1:
        return 'state-green'; // Clase CSS para estado Standby en rojo
      case 0:
        return 'state-red'; // Clase CSS para estado Progress en naranja
      default:
        return ''; // Clase CSS predeterminada si el estado no coincide con ninguna opción
    }
  }
}
