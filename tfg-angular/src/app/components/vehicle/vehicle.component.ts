import { Component} from '@angular/core';
import { crudService } from 'src/app/services/crudService';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css'],
  providers:[crudService]
})
export class VehicleComponent {

  public token: any;
  public identity: any;
  public vehicles: any[] = []; // Array para almacenar los productos

  constructor(
    private _crudService: crudService
  ) {
    this.loadUser();
  }

  ngOnInit(): void {
    this.listVehicles();
  }

  listVehicles() {
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
