import { Component } from '@angular/core';
import { usedVechile } from 'src/app/models/usedVehicle';
import { crudService } from 'src/app/services/crudService';

@Component({
  selector: 'app-list-used-vehicle',
  templateUrl: './list-used-vehicle.component.html',
  styleUrls: ['./list-used-vehicle.component.css'],
  providers:[crudService]
})
export class ListUsedVehicleComponent {

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
    this._crudService.getObject(this.token, 'vehicle/findByCamp/', this.identity.sub).subscribe(
      (response) => {
        this.vehicles = [...response.$model]; 

        for(const object of this.vehicles){
          this._crudService.getObject(this.token, 'usedVehicle/', object.id_vehicle).subscribe(
            (response) => {
              this.usedVehicle.push(response.$model as usedVechile); 
              
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
    this._crudService.deleteObject(this.token,'vehicle/',id_vehicle).subscribe(
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
