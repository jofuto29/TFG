import { Component } from '@angular/core';
import { crudService } from 'src/app/services/crudService';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css'],
  providers: [crudService]
})
export class SupplierComponent {

  public token: any;
  public identity: any;
  public suppliers: any[] = []; // Array para almacenar los productos

  constructor(
    private _crudService: crudService
  ) {
    this.loadUser();
  }

  ngOnInit(): void {
    this.listSupppliers();
  }

  listSupppliers() {
    this._crudService.listObjects(this.token, 'supplier').subscribe(
      (response) => {
        // Manejar la respuesta exitosa aquí --> la imagen ha sido subida
        this.suppliers = [...response.$model]; // Asignar la respuesta al array de productos
      },
      (error) => {
        // Manejar el error aquí
        console.error(error);
      }
    );
  }

  deleteSupplier(id_supplier: number) {
    this._crudService.deleteObject(this.token,'supplier/',id_supplier).subscribe(
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

