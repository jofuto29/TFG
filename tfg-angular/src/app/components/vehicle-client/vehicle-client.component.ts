import { Component } from '@angular/core';
import { crudService } from 'src/app/services/crudService';

@Component({
  selector: 'app-vehicle-client',
  templateUrl: './vehicle-client.component.html',
  styleUrls: ['./vehicle-client.component.css'],
  providers:[crudService]
})
export class VehicleClientComponent {

  public token: any;
  public identity: any;
  public vehicles: any[] = []; // Array para almacenar los productos

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
        // Manejar la respuesta exitosa aquí --> la imagen ha sido subida
        this.vehicles = [...response.$model]; // Asignar la respuesta al array de productos
      },
      (error) => {
        // Manejar el error aquí
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
