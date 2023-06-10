import { Component} from '@angular/core';
import { deduction } from 'src/app/models/deductions';
import { Router} from '@angular/router';
import { crudService } from 'src/app/services/crudService';

@Component({
  selector: 'app-deductions-register',
  templateUrl: './deductions-register.component.html',
  styleUrls: ['./deductions-register.component.css'],
  providers: [crudService]
})
export class DeductionsRegisterComponent {
  public deductionData: deduction
  public localStatus: string;
  public identity: any;
  public token: any;

  constructor(
    private _crudService: crudService,
    private _router: Router
  ){
    this.localStatus = "";
    this.deductionData = new deduction(1,"","",0,1,0, "");
    this.loadUser();
  }

  loadUser() {
    this.identity = this._crudService.getIdentity();
    this.token = this._crudService.getToken();
  }

  onSubmit(form: any){
    this._crudService.registerObject(this.token, "deduction", this.deductionData).subscribe(  //el metodo subscribe viene por el tipo observable que hemos declarado en el servicio
      (response) => {
        this.localStatus = "success";
        this._router.navigate(['deductions']);
      },
      (error) => {
        // Manejar el error aquí
        console.error(error);
        this.localStatus = "error";
      }
    );
  }
}
