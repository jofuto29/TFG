import { Component, OnInit} from '@angular/core';
import { vehicle } from 'src/app/models/vehicle';
import { Router, ActivatedRoute} from '@angular/router';
import { crudService } from 'src/app/services/crudService';

@Component({
  selector: 'app-vehicle-update',
  templateUrl: './vehicle-update.component.html',
  styleUrls: ['./vehicle-update.component.css'],
  providers: [crudService]
})
export class VehicleUpdateComponent implements OnInit{
  public vehicleData: vehicle;
  public status: string;
  public identity: any;
  public token: any;
  public vehicleId: number = 0;

  public users: any[] = [];

  constructor(
    private _crudService: crudService,
    private _router: Router,
    private _route: ActivatedRoute
  ){
    this.status = "";
    this.vehicleData = new vehicle(1,1," "," ","", 0, "", "");
    this.loadUser();
    this.listUsers();
  }

  ngOnInit(): void {
    this.vehicleId = this._route.snapshot.queryParams['id'];
    this.getVehicle();
  }

  loadUser() {
    this.identity = this._crudService.getIdentity();
    this.token = this._crudService.getToken();
  }

  onSubmit(form: any){
   this._crudService.updateObject(this.token, "vehicle/", this.vehicleData, this.vehicleId).subscribe(  //el metodo subscribe viene por el tipo observable que hemos declarado en el servicio
      (response) => {
        console.log(response);
        this.status = "success";
        this._router.navigate(['vehicles']);
      },
      (error) => {
        // Manejar el error aquí
        console.error(error);
        this.status = "error";
      }
    );
  }

  listUsers(){
    this._crudService.listObjects(this.token, 'user/listUsers').subscribe(
      (response) => {
        // Manejar la respuesta exitosa aquí --> la imagen ha sido subida
        this.users = [...response.$model]; // Asignar la respuesta al array de productos
      },
      (error) => {
        // Manejar el error aquí
        console.error(error);
      }
    );
  }

  getVehicle(){
    this._crudService.getObject(this.token, "vehicle/", this.vehicleId).subscribe(
      (response) => {
        this.vehicleData = response.$model as vehicle;
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
