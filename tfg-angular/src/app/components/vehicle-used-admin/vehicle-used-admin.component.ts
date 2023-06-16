import { Component } from '@angular/core';
import { usedVechile } from 'src/app/models/usedVehicle';
import { crudService } from 'src/app/services/crudService';

@Component({
  selector: 'app-vehicle-used-admin',
  templateUrl: './vehicle-used-admin.component.html',
  styleUrls: ['./vehicle-used-admin.component.css'],
  providers:[crudService]
})
export class VehicleUsedAdminComponent {

  public token: any;
  public identity: any;
  public vehicles: any[] = []; // Array para almacenar los productos
  public usedVehicle: any[] = []; // Array para almacenar los productos

  constructor(
    private _crudService: crudService
  ) {
    this.loadUser();
  }

  ngOnInit(): void {
    this.listVehiclesUsers();
  }

  listVehiclesUsers() {
    this._crudService.listObjects(this.token, 'usedVehicle' ).subscribe(
      (response) => {
        this.usedVehicle = [...response.$model]; 

        for(const object of this.usedVehicle){
          this._crudService.getObject(this.token, 'vehicle/', object.id_vehicle).subscribe(
            (response) => {
              this.vehicles.push(response.$model); 
            },
            (error) => {
              console.error(error);
            }
          );
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }

  deleteVehicle(id_vehicle: number) {
    this._crudService.deleteObject(this.token,'usedVehicle/',id_vehicle).subscribe(
      (response) => {
        window.location.reload();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  loadUser() {
    this.identity = this._crudService.getIdentity();
    this.token = this._crudService.getToken();
  }
}
