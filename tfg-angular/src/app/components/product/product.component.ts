import { Component, OnInit } from '@angular/core';
import { user } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { productService } from 'src/app/services/product.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

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

  updateProduct(productId: number) {
    // Lógica para actualizar el producto con el ID proporcionado
  }
  
  deleteProduct(productId: number) {
    // Lógica para eliminar el producto con el ID proporcionado
  }
}

