import { Component, OnInit } from '@angular/core';
import { product } from '../../models/product';
import { crudService } from 'src/app/services/crudService';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css'],
  providers:[crudService]
})
export class ProductUpdateComponent implements OnInit{
  public productData: product;
  public status: string;
  public today = new Date();
  public identity: any;
  public token: any;
  public productId: Number;

  constructor(
    private _crudService: crudService,
    private _router: Router,
    private _route: ActivatedRoute
  ){
    this.status = "";
    this.productId = 0;
    this.loadUser();
    this.productData = new product(1,1,1,'','',100.0,2,this.today,this.today,'','','','','');
  }

  ngOnInit(): void {
    this.productId = this._route.snapshot.queryParams['id'];
    this.getProduct();
  }

  loadUser() {
    this.identity = this._crudService.getIdentity();
    this.token = this._crudService.getToken();
  }

  /*http://tfg.com.devel/product/5 [PUT]*/
  onSubmit(form: any){
    console.log(this.productData);
    this._crudService.updateObject(this.token,"product/", this.productData, this.productId).subscribe(  //el metodo subscribe viene por el tipo observable que hemos declarado en el servicio
        response =>{
          if(response.status == "success"){
            this.status = "success";
            this._router.navigate(['productos']);
          }else{
            this.status = 'error';
          }
        },
        error=>{
          this.status = 'error';
          console.log(<any>error);
        }
      );
  }

  subirFile(event:any){
    const imagen = event.target.files[0];

    this._crudService.uploadImage(this.token, imagen, 'product/storeImage').subscribe(
      (response) => {
        this.productData.img = response.image;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getProduct(){
    this._crudService.getObject(this.token, "product/", this.productId).subscribe(
      (response) => {
        this.productData = response.$model as product;
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
