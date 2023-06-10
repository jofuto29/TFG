import { Component, OnInit } from '@angular/core';
import { crudService } from 'src/app/services/crudService';
import { Router, ActivatedRoute} from '@angular/router';
import { deduction } from 'src/app/models/deductions';

@Component({
  selector: 'app-deductions-update',
  templateUrl: './deductions-update.component.html',
  styleUrls: ['./deductions-update.component.css'],
  providers:[crudService]
})
export class DeductionsUpdateComponent implements OnInit{

  public deductionData: deduction;
  public status: string;
  public identity: any;
  public token: any;
  public deductionId: Number;

  constructor(
    private _crudService: crudService,
    private _router: Router,
    private _route: ActivatedRoute
  ){
  this.status = "";
  this.deductionId = 0;
  this.loadUser();
  this.deductionData = new deduction(1,"","",0,1,0, "");
}

ngOnInit(): void {
  this.deductionId = this._route.snapshot.queryParams['id'];
  this.getDeduction();
}

loadUser() {
  this.identity = this._crudService.getIdentity();
  this.token = this._crudService.getToken();
}

/*http://tfg.com.devel/product/5 [PUT]*/
onSubmit(form: any){
  this._crudService.updateObject(this.token,"deduction/", this.deductionData, this.deductionId).subscribe(  //el metodo subscribe viene por el tipo observable que hemos declarado en el servicio
      response =>{
        if(response.status == "success"){
          this.status = "success";
          this._router.navigate(['deductions']);
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

getDeduction(){
  this._crudService.getObject(this.token, "deduction/", this.deductionId).subscribe(
    (response) => {
      this.deductionData = response.$model as deduction;
    },
    (error) => {
      console.error(error);
    }
  );
}

}
