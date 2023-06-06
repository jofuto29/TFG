import { Component, OnInit } from '@angular/core';
import { crudService } from 'src/app/services/crudService';
import { Router, ActivatedRoute} from '@angular/router';
import { services } from 'src/app/models/services';

@Component({
  selector: 'app-service-update',
  templateUrl: './service-update.component.html',
  styleUrls: ['./service-update.component.css'],
  providers:[crudService]
})
export class ServiceUpdateComponent implements OnInit{

  public serviceData: services;
  public status: string;
  public identity: any;
  public token: any;
  public serviceId: Number;

  constructor(
    private _crudService: crudService,
    private _router: Router,
    private _route: ActivatedRoute
  ){
    this.status = "";
    this.serviceId = 0;
    this.loadUser();
    this.serviceData = new services(1,"","",0,"",0, "","");
  }

  ngOnInit(): void {
    this.serviceId = this._route.snapshot.queryParams['id'];
    this.getService();
  }

  loadUser() {
    this.identity = this._crudService.getIdentity();
    this.token = this._crudService.getToken();
  }

  /*http://tfg.com.devel/product/5 [PUT]*/
  onSubmit(form: any){
    this._crudService.updateObject(this.token,"service/", this.serviceData, this.serviceId).subscribe(  //el metodo subscribe viene por el tipo observable que hemos declarado en el servicio
        response =>{
          if(response.status == "success"){
            this.status = "success";
            this._router.navigate(['services']);
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

  getService(){
    this._crudService.getObject(this.token, "service/", this.serviceId).subscribe(
      (response) => {
        this.serviceData = response.$model as services;
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
