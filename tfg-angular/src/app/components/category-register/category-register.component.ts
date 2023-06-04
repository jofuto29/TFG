import { Component } from '@angular/core';
import { crudService } from 'src/app/services/crudService';
import { Router} from '@angular/router';
import { category } from 'src/app/models/category';

@Component({
  selector: 'app-category-register',
  templateUrl: './category-register.component.html',
  styleUrls: ['./category-register.component.css'],
  providers:[crudService]
})
export class CategoryRegisterComponent {
  public categoryData: category;
  public status: string;
  public identity: any;
  public token: any;

  constructor(
    private _crudService: crudService,
    private _router: Router
  ){
    this.status = "";
    this.categoryData = new category(1," "," ","","");
    this.loadUser();
  }

  loadUser() {
    this.identity = this._crudService.getIdentity();
    this.token = this._crudService.getToken();
  }

  onSubmit(form: any){
    this._crudService.registerObject(this.token, "category", this.categoryData).subscribe(  //el metodo subscribe viene por el tipo observable que hemos declarado en el servicio
      (response) => {
        console.log(response);
        this.status = "success";
        this._router.navigate(['categories']);
      },
      (error) => {
        // Manejar el error aquí
        console.error(error);
        this.status = "error";
      }
    );
  }
}
