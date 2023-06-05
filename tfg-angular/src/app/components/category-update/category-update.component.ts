import { Component, OnInit } from '@angular/core';
import { crudService } from 'src/app/services/crudService';
import { Router, ActivatedRoute} from '@angular/router';
import { category } from 'src/app/models/category';

@Component({
  selector: 'app-category-update',
  templateUrl: './category-update.component.html',
  styleUrls: ['./category-update.component.css'],
  providers:[crudService]
})
export class CategoryUpdateComponent implements OnInit{
  public categoryData: category;
  public status: string;
  public identity: any;
  public token: any;
  public categoryId: Number;

  constructor(
    private _crudService: crudService,
    private _router: Router,
    private _route: ActivatedRoute
  ){
    this.status = "";
    this.categoryId = 0;
    this.loadUser();
    this.categoryData = new category(1,'','','','');
  }

  ngOnInit(): void {
    this.categoryId = this._route.snapshot.queryParams['id'];
    this.getCategory();
  }

  loadUser() {
    this.identity = this._crudService.getIdentity();
    this.token = this._crudService.getToken();
  }

  /*http://tfg.com.devel/product/5 [PUT]*/
  onSubmit(form: any){
    console.log(this.categoryData);
    this._crudService.updateObject(this.token,"category/", this.categoryData, this.categoryId).subscribe(  //el metodo subscribe viene por el tipo observable que hemos declarado en el servicio
        response =>{
          if(response.status == "success"){
            this.status = "success";
            this._router.navigate(['categories']);
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
    this._crudService.getObject(this.token, "category/", this.categoryId).subscribe(
      (response) => {
        this.categoryData = response.$model as category;
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
