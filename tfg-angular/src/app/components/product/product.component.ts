import { Component, OnInit } from '@angular/core';
import { crudService } from 'src/app/services/crudService';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  providers: [crudService]
})
export class ProductComponent implements OnInit {
  public token: any;
  public identity: any;
  public productos: any[] = []; // Array para almacenar los productos
  public sanitizedImageUrls: { [key: string]: any } = {};

  constructor(
    private sanitizer: DomSanitizer,
    private _crudService: crudService
  ) {
    this.loadUser();
  }

  ngOnInit(): void {
    this.listProducts();
  }

  listProducts() {
    this._crudService.listObjects(this.token, 'product').subscribe(
      (response) => {
        // Manejar la respuesta exitosa aquí --> la imagen ha sido subida
        this.productos = [...response.$model]; // Asignar la respuesta al array de productos
        this.getUrlsImage();
      },
      (error) => {
        // Manejar el error aquí
        console.error(error);
      }
    );
  }

  deleteProduct(productId: number) {
    this._crudService.deleteObject(this.token,'product/',productId).subscribe(
      (response) => {
        window.location.reload();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  /*no funcionaba porque se ejecutan asincronamente, subscribe hace que el valor espera a que tenga la resupeusa*/
  getUrlsImage(){
    for (const producto of this.productos) {
      this.getImage(producto.img).subscribe((result: SafeUrl) => {
        this.sanitizedImageUrls[producto.img] = result;
      });
    }
  }

  getImage(name:string): Observable<any>{
    return this._crudService.getImage(this.token, 'product/getImage/', name).pipe(//tranformamos el observable que es lo que devolemos, el src de la imagen cargada
      map((response: Blob) => {//dentro de map se tranforma la respuesta de tipo blob en una url segura 
        const objectUrl = URL.createObjectURL(response);
        return this.sanitizer.bypassSecurityTrustUrl(objectUrl);//devolvemos a pipe una url segura
      }),
    );
  }

  loadUser() {
    this.identity = this._crudService.getIdentity();
    this.token = this._crudService.getToken();
  }
}

