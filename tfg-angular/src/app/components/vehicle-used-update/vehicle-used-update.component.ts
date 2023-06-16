import { Component} from '@angular/core';
import { usedVechile } from 'src/app/models/usedVehicle';
import { Router} from '@angular/router';
import { crudService } from 'src/app/services/crudService';

@Component({
  selector: 'app-vehicle-used-update',
  templateUrl: './vehicle-used-update.component.html',
  styleUrls: ['./vehicle-used-update.component.css'],
  providers: [crudService]
})
export class VehicleUsedUpdateComponent {
  public vehicleData: usedVechile;
  public status: string;
  public identity: any;
  public token: any;

  public vehicles: any[] = [];
  public selectedImages: string[] = [];

  constructor(
    private _crudService: crudService,
    private _router: Router
  ){
    this.status = "";
    this.vehicleData = new usedVechile(1,1,"","","",1,1,1,1,new Date(),new Date(),"","",1,1,1,1,1,1,1,1,1,1,"","","","");
    this.loadUser();
    this.listVehicles();
  }

  loadUser() {
    this.identity = this._crudService.getIdentity();
    this.token = this._crudService.getToken();
  }

  onSubmit(form: any){
    
    this.vehicleData.img = this.selectedImages.map(image => image).join(";");
    
   this._crudService.registerObject(this.token, "usedVehicle", this.vehicleData).subscribe(  //el metodo subscribe viene por el tipo observable que hemos declarado en el servicio
      (response) => {
        console.log(response);
        this.status = "success";
        this._router.navigate(['usedVehicles']);
      },
      (error) => {
        // Manejar el error aquí
        console.error(error);
        this.status = "error";
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
    console.log(i);
    this.selectedImages.splice(i, 1);
    console.log(this.selectedImages);
  }
}
