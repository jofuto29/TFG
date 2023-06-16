import { Component, OnInit} from '@angular/core';
import { usedVechile } from 'src/app/models/usedVehicle';
import { Router, ActivatedRoute} from '@angular/router';
import { crudService } from 'src/app/services/crudService';

@Component({
  selector: 'app-vehicle-used-update',
  templateUrl: './vehicle-used-update.component.html',
  styleUrls: ['./vehicle-used-update.component.css'],
  providers: [crudService]
})
export class VehicleUsedUpdateComponent implements OnInit{
  public vehicleData: usedVechile;
  public status: string;
  public identity: any;
  public token: any;
  public vehicleUsedId:number = 0;

  public vehicles: any[] = [];
  public selectedImages: string[] = [];

  constructor(
    private _crudService: crudService,
    private _router: Router,
    private _route: ActivatedRoute
  ){
    this.status = "";
    this.vehicleData = new usedVechile(1,1,"","","",1,1,1,1,new Date(),new Date(),"","",1,1,1,1,1,1,1,1,1,1,"","","","");
    this.loadUser();

    if(this.identity.rol = "admin"){
      this.listVehiclesAdmin();
    }else{
      this.listVehicles();
    }
  }

  ngOnInit(): void {
    this.vehicleUsedId = this._route.snapshot.queryParams['id'];
    this.getVehicle();
  }

  loadUser() {
    this.identity = this._crudService.getIdentity();
    this.token = this._crudService.getToken();
  }

  onSubmit(form: any){
    
   this.vehicleData.img = this.selectedImages.map(image => image).join(";");
    
   this._crudService.updateObject(this.token, "usedVehicle/", this.vehicleData, this.vehicleUsedId).subscribe(  //el metodo subscribe viene por el tipo observable que hemos declarado en el servicio
      (response) => {
        this.status = "success";
        if(this.identity.rol == "admin"){
          this._router.navigate(['usedVehiclesAdmin']);
        }else{
          this._router.navigate(['usedVehicles']);
        }
      },
      (error) => {
        console.error(error);
        this.status = "error";
      }
    );
  }

  listVehiclesAdmin(){
    this._crudService.listObjects(this.token, 'vehicle').subscribe(
      (response) => {
        // Manejar la respuesta exitosa aquí --> la imagen ha sido subida
        this.vehicles = [...response.$model]; // Asignar la respuesta al array de productos
      },
      (error) => {
        // Manejar el error aquí
        console.error(error);
      }
    );
  }

  listVehicles(){
    this._crudService.getObject(this.token, 'vehicle/findByCamp/',this.identity.sub).subscribe(
      (response) => {
        // Manejar la respuesta exitosa aquí --> la imagen ha sido subida
        this.vehicles = [...response.$model]; // Asignar la respuesta al array de productos
      },
      (error) => {
        // Manejar el error aquí
        console.error(error);
      }
    );
  }

  getVehicle(){
    this._crudService.getObject(this.token, "usedVehicle/", this.vehicleUsedId).subscribe(
      (response) => {
        this.vehicleData = response.$model;
        this.loadImg();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  loadImg(){
    const imageNames = this.vehicleData.img.split(";");
    for(let i = 0; i < imageNames.length; i++){
      this.selectedImages.push(imageNames[i]);
    }
  }

  subirFile(event:any){
    const imagen = event.target.files[0];

    this._crudService.uploadImage(this.token, imagen, 'usedVehicle/uploadImage').subscribe(
      (response) => {
        this.selectedImages.push(response.image);
        console.log(this.selectedImages);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  removeImage(i:number){
    this.selectedImages.splice(i, 1);
  }
}
