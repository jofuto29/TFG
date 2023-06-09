import { Component, OnInit } from '@angular/core';
import { crudService } from 'src/app/services/crudService';

@Component({
  selector: 'app-reparation',
  templateUrl: './reparation.component.html',
  styleUrls: ['./reparation.component.css'],
  providers: [crudService]
})
export class ReparationComponent implements OnInit{
  public token: any;
  public identity: any;
  public reparations: any[] = []; // Array para almacenar los productos

  constructor(
    private _crudService: crudService
  ) {
    this.loadUser();
  }

  ngOnInit(): void {
    this.listReparations();
  }

  listReparations() {
    this._crudService.listObjects(this.token, 'reparation').subscribe(
      (response) => {
        this.reparations = [...response.$model];
      },
      (error) => {
        console.error(error);
      }
    );
  }

  deleteReparation(reparationId: number) {
    this._crudService.deleteObject(this.token,'reparation/',reparationId).subscribe(
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

  getStateClass(state: string): string {
    switch (state) {
      case 'Standby':
        return 'state-red'; // Clase CSS para estado Standby en rojo
      case 'Progress':
        return 'state-orange'; // Clase CSS para estado Progress en naranja
      case 'Complete':
        return 'state-green'; // Clase CSS para estado Complete en verde
      default:
        return ''; // Clase CSS predeterminada si el estado no coincide con ninguna opción
    }
  }
}
