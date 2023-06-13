import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { booking } from 'src/app/models/booking';
import { crudService } from 'src/app/services/crudService';
import { Router} from '@angular/router';

@Component({
  selector: 'app-booking-update',
  templateUrl: './booking-update.component.html',
  styleUrls: ['./booking-update.component.css'],
  providers: [crudService]
})
export class BookingUpdateComponent implements OnInit{

  public bookingData: booking;
  public vehicles:any[] = [];
  public identity: any;
  public token: any;
  public id_booking:any = 0;

  constructor(
      private _crudService: crudService,
      private _route: ActivatedRoute,
      private _router: Router
    )
    {
      this.bookingData = new booking(1,1,1,new Date(),"","");
    }

  ngOnInit(): void {
    this.id_booking = this._route.snapshot.queryParams['id'];
    this.loadUser();
    this.getVehicles();
    this.getBooking();
  }

  loadUser() {
    this.identity = this._crudService.getIdentity();
    this.token = this._crudService.getToken();
    this.bookingData.id_user = this.identity.sub;
  }

  onSubmit(form: any){
    this._crudService.updateObject(this.token, "booking/", this.bookingData, this.id_booking).subscribe(  //el metodo subscribe viene por el tipo observable que hemos declarado en el servicio
      (response) => {
        this._router.navigate(['bookings']);
      },
      (error) => {
        // Manejar el error aquí
        console.error(error);
      }
    );
  }

  getVehicles(){
    this._crudService.getObject(this.token, "vehicle/findByCamp/", this.identity.sub).subscribe(  //el metodo subscribe viene por el tipo observable que hemos declarado en el servicio
      (response) => {
        this.vehicles = [...response.$model];
      },
      (error) => {
        // Manejar el error aquí
        console.error(error);
      }
    );
  }

  getBooking(){
    this._crudService.getObject(this.token, "booking/", this.id_booking).subscribe(  //el metodo subscribe viene por el tipo observable que hemos declarado en el servicio
      (response) => {
        this.bookingData = response.$model;
        if(this.bookingData.id_user != this.identity.sub){
          console.log("no eres dueño de esta reserva");
          this._router.navigate(['bookings']);
        }
      },
      (error) => {
        // Manejar el error aquí
        console.error(error);
      }
    );
  }

  deleteBooking(){
    this._crudService.deleteObject(this.token,'booking/',this.id_booking).subscribe(
      (response) => {
        this._router.navigate(['bookings']);
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
