import { Component, OnInit } from '@angular/core';
import { crudService } from 'src/app/services/crudService';
import { Router, ActivatedRoute} from '@angular/router';
import { supplier } from 'src/app/models/supplier';

@Component({
  selector: 'app-supplier-update',
  templateUrl: './supplier-update.component.html',
  styleUrls: ['./supplier-update.component.css'],
  providers:[crudService]
})
export class SupplierUpdateComponent implements OnInit{
  public supplierData: supplier;
  public status: string;
  public identity: any;
  public token: any;
  public supplierId: Number;

  constructor(
    private _crudService: crudService,
    private _router: Router,
    private _route: ActivatedRoute
  ){
    this.status = "";
    this.supplierId = 0;
    this.loadUser();
    this.supplierData = new supplier(1," "," "," ",0, 0, "", "", "");
  }

  ngOnInit(): void {
    this.supplierId = this._route.snapshot.queryParams['id'];
    this.getCategory();
  }

  loadUser() {
    this.identity = this._crudService.getIdentity();
    this.token = this._crudService.getToken();
  }

  /*http://tfg.com.devel/product/5 [PUT]*/
  onSubmit(form: any){
    console.log(this.supplierData);
    this._crudService.updateObject(this.token,"supplier/", this.supplierData, this.supplierId).subscribe(  //el metodo subscribe viene por el tipo observable que hemos declarado en el servicio
        response =>{
          if(response.status == "success"){
            this.status = "success";
            this._router.navigate(['suppliers']);
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

  getCategory(){
    this._crudService.getObject(this.token, "supplier/", this.supplierId).subscribe(
      (response) => {
        this.supplierData = response.$model as supplier;
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
