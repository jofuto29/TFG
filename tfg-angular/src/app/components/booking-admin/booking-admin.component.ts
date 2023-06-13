import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { crudService } from 'src/app/services/crudService';
import { Router} from '@angular/router';

@Component({
  selector: 'app-booking-admin',
  templateUrl: './booking-admin.component.html',
  styleUrls: ['./booking-admin.component.css'],
  providers: [crudService]
})
export class BookingAdminComponent {
  public bookings:any[] = [];
  public identity: any;
  public token: any;

  constructor(
      private _crudService: crudService,
      private _route: ActivatedRoute,
      private _router: Router
    )
    {
    }

  ngOnInit(): void {
    this.loadUser();
    this.getBooking();
  }

  loadUser() {
    this.identity = this._crudService.getIdentity();
    this.token = this._crudService.getToken();
  }

  getBooking(){
    this._crudService.listObjects(this.token, "booking").subscribe(  //el metodo subscribe viene por el tipo observable que hemos declarado en el servicio
      (response) => {
        this.bookings = response.$model;
      },
      (error) => {
        // Manejar el error aquí
        console.error(error);
      }
    );
  }

  deleteBooking(id_booking:number){
    this._crudService.deleteObject(this.token,'booking/',id_booking).subscribe(
      (response) => {
        window.location.reload();
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
