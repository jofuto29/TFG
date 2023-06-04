import { Component } from '@angular/core';
import { product } from '../../models/product';
import { crudService } from 'src/app/services/crudService';
import { Router} from '@angular/router';


@Component({
  selector: 'app-product-register',
  templateUrl: './product-register.component.html',
  styleUrls: ['./product-register.component.css'],
  providers:[crudService]
})

export class ProductRegisterComponent {
  public productData: product;
  public status: string;
  public today = new Date();
  public identity: any;
  public token: any;

  constructor(
    private _crudService: crudService,
    private _router: Router
  ){
    this.status = "";
    this.productData = new product(1,1,1,'','',100.0,2,this.today,this.today,'','','','','');
    this.loadUser();
  }

  loadUser() {
    this.identity = this._crudService.getIdentity();
    this.token = this._crudService.getToken();
  }

  onSubmit(form: any){
    this._crudService.registerObject(this.token, "product", this.productData).subscribe(  //el metodo subscribe viene por el tipo observable que hemos declarado en el servicio
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

    this._crudService.uploadImage(this.token, imagen, 'product/storeImage').subscribe(
      (response) => {
        this.productData.img = response.image;
      },
      (error) => {
        console.error(error);
      }
    );
  }

}