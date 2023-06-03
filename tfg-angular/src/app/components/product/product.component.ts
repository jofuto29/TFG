import { Component, OnInit } from '@angular/core';
import { user } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { productService } from 'src/app/services/product.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  providers: [UserService, productService]
})
export class ProductComponent implements OnInit {
  public token: any;
  public identity: any;
  public productos: any[] = []; // Array para almacenar los productos
  public sanitizedImageUrls: { [key: string]: any } = {};

  constructor(
    private _userService: UserService,
    private _http: HttpClient,
    private sanitizer: DomSanitizer,
    private _productService: productService
  ) {
    this.loadUser();
  }

  ngOnInit(): void {
    this.listProducts();
  }

  listProducts() {
    this._productService.listProducts(this.token, 'product').subscribe(
      (response) => {
        // Manejar la respuesta exitosa aquí --> la imagen ha sido subida
        console.log(response);
        this.productos = [...response.$model]; // Asignar la respuesta al array de productos
        this.getUrlsImage();
        console.log(this.sanitizedImageUrls);
      },
      (error) => {
        // Manejar el error aquí
        console.error(error);
      }
    );
  }

  loadUser() {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  deleteProduct(productId: number) {
    // Lógica para eliminar el producto con el ID proporcionado
    console.log(productId);
    this._productService.deleteProduct(productId,'product/',this.token).subscribe(
      (response) => {
        // Manejar la respuesta exitosa aquí --> la imagen ha sido subida
        console.log(response);
        window.location.reload();
      },
      (error) => {
        // Manejar el error aquí
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
    return this._userService.getImage(this.token, 'product/getImage/', name).pipe(//tranformamos el observable que es lo que devolemos, el src de la imagen cargada
      map((response: Blob) => {//dentro de map se tranforma la respuesta de tipo blob en una url segura 
        const objectUrl = URL.createObjectURL(response);
        return this.sanitizer.bypassSecurityTrustUrl(objectUrl);//devolvemos a pipe una url segura
      }),
    );
  }
}

