import { Component, OnInit } from '@angular/core';
import { product } from '../../models/product';
import { productService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css'],
  providers:[productService, UserService]
})
export class ProductUpdateComponent implements OnInit{
  public productData: product;
  public status: string;
  public today = new Date();
  public identity: any;
  public token: any;
  public productId: Number;

  constructor(
    private _productService: productService,
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute
  ){
    this.status = "";
    this.productId = 0;
    this.productData = new product(1,1,1,'','',100.0,2,this.today,this.today,'','','','','');
    this.loadUser();
  }

  ngOnInit(): void {
    this.productId = this._route.snapshot.queryParams['id'];
    console.log(this.productId);
  }

  loadUser() {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  onSubmit(form: any){
    console.log(this.productData);
    this._productService.registerProduct(this.token, "product", this.productData).subscribe(  //el metodo subscribe viene por el tipo observable que hemos declarado en el servicio
      (response) => {
        console.log(response);
        this.status = "success";
        this._router.navigate(['productos']);
      },
      (error) => {
        // Manejar el error aquí
        console.error(error);
        this.status = "error";
      }
    );
  }

  subirFile(event:any){
    const imagen = event.target.files[0];
    console.log(imagen);
    console.log(this.token);
    
    this._userService.uploadImage(this.token, imagen, 'product/storeImage').subscribe(
      (response) => {
        console.log(response);
        console.log("nombre de la imagen " + response.image)
        this.productData.img = response.image;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getProduct(){
    this._productService.getProduct();
  }
    
}
