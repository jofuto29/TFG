import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { booking } from 'src/app/models/booking';
import { crudService } from 'src/app/services/crudService';
import { Router} from '@angular/router';

@Component({
  selector: 'app-booking-register',
  templateUrl: './booking-register.component.html',
  styleUrls: ['./booking-register.component.css'],
  providers: [crudService]
})
export class BookingRegisterComponent implements OnInit{

  public bookingDate: Date = new Date();
  public bookingData: booking;
  public vehicles:any[] = [];
  public identity: any;
  public token: any;

  constructor(
      private _crudService: crudService,
      private _route: ActivatedRoute,
      private _router: Router
    )
    {
      this.bookingData = new booking(1,1,1,this.bookingDate,"","");
    }

  ngOnInit(): void {
    this.bookingDate = this._route.snapshot.queryParams['date'];
    this.bookingData.date_booking = this.bookingDate;
    this.loadUser();
    this.getVehicles();
  }

  loadUser() {
    this.identity = this._crudService.getIdentity();
    this.token = this._crudService.getToken();
    this.bookingData.id_user = this.identity.sub;
  }

  onSubmit(form: any){
    console.log(this.bookingData);
    this._crudService.registerObject(this.token, "booking", this.bookingData).subscribe(  //el metodo subscribe viene por el tipo observable que hemos declarado en el servicio
      (response) => {
        console.log(response);
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
        console.log(response);
        this.vehicles = [...response.$model];
      },
      (error) => {
        // Manejar el error aquí
        console.error(error);
      }
    );
  }
}
