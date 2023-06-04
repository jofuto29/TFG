import { Component } from '@angular/core';
import { crudService } from 'src/app/services/crudService';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  providers: [crudService]
})
export class CategoryComponent {
  public token: any;
  public identity: any;
  public categories: any[] = []; // Array para almacenar los productos

  constructor(
    private _crudService: crudService
  ) {
    this.loadUser();
  }

  ngOnInit(): void {
    this.listCategories();
  }

  listCategories() {
    this._crudService.listObjects(this.token, 'category').subscribe(
      (response) => {
        // Manejar la respuesta exitosa aquí --> la imagen ha sido subida
        this.categories = [...response.$model]; // Asignar la respuesta al array de productos
      },
      (error) => {
        // Manejar el error aquí
        console.error(error);
      }
    );
  }

  deleteCategory(id_category: number) {
    this._crudService.deleteObject(this.token,'category/',id_category).subscribe(
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
