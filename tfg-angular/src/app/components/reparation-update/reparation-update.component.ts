import { Component, OnInit } from '@angular/core';
import { crudService } from 'src/app/services/crudService';
import { Router, ActivatedRoute} from '@angular/router';
import { reparation } from 'src/app/models/reparation';

@Component({
  selector: 'app-reparation-update',
  templateUrl: './reparation-update.component.html',
  styleUrls: ['./reparation-update.component.css'],
  providers:[crudService]
})
export class ReparationUpdateComponent {
  
  public reparationData: reparation;
  public status: string;
  public identity: any;
  public token: any;
  public reparationId: Number;
  public vehicles: any[] = []; // Array para almacenar los vehiculos

  constructor(
    private _crudService: crudService,
    private _router: Router,
    private _route: ActivatedRoute
  ){
    this.status = "";
    this.reparationId = 0;
    this.loadUser();
    this.reparationData = new reparation(1,1,1,new Date(),new Date(),"","","", "","");
  }

  ngOnInit(): void {
    this.reparationId = this._route.snapshot.queryParams['id'];
    this.getReparation();
    this.listVehicles();
  }

  loadUser() {
    this.identity = this._crudService.getIdentity();
    this.token = this._crudService.getToken();
  }

  /*http://tfg.com.devel/product/5 [PUT]*/
  onSubmit(form: any){
    this._crudService.updateObject(this.token,"reparation/", this.reparationData, this.reparationId).subscribe(  //el metodo subscribe viene por el tipo observable que hemos declarado en el servicio
        response =>{
          if(response.status == "success"){
            this.status = "success";
            this._router.navigate(['reparations']);
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

  getReparation(){
    this._crudService.getObject(this.token, "reparation/", this.reparationId).subscribe(
      (response) => {
        this.reparationData = response.$model as reparation;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  listVehicles() {
    this._crudService.listObjects(this.token, 'vehicle').subscribe(
      (response) => {
        this.vehicles = [...response.$model];
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
