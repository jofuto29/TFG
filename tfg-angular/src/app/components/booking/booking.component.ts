import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { formatDate } from '@angular/common';
import { crudService } from 'src/app/services/crudService';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
  providers: [crudService]
})
export class BookingComponent implements OnInit{

  days: { date: Date }[] = [];
  timeSlots: string[] = [
    '8:00','9:00','10:00', '11:00','12:00','13:00', '14:00','15:00',
    '16:00','17:00', '18:00'
  ];

  public identity: any;
  public token: any;
  public bookings: any[] = [];
  daysEs: any[] = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];

  constructor(
    private _router: Router,
    private _crudService: crudService
  ){
  }


  generateDays(): void {
  const startDate = new Date(); // Puedes ajustar la fecha de inicio según tus necesidades
  const endDate = new Date(); // Puedes ajustar la fecha de fin según tus necesidades

  let daysAdded = 0; // Contador para llevar el registro de los días agregados

  while (daysAdded < 7) {
    if (startDate.getDay() !== 0 && startDate.getDay() !== 6) {
      this.days.push({ date: new Date(startDate) });
      daysAdded++;
    }

    startDate.setDate(startDate.getDate() + 1);
  }

  // Ajustamos la fecha de fin (endDate) para que sea el siguiente viernes
  endDate.setDate(startDate.getDate() + (5 - startDate.getDay()));
  }

  ngOnInit(): void {
    this.generateDays();
    this.loadUser();
    this.getBooking();
  }

  getBookingDate(date:any, time:any){
    const bookingDate = new Date(date);
    const [hours, minutes] = time.split(':');

    bookingDate.setHours(Number(hours));
    bookingDate.setMinutes(Number(minutes));

    const formattedDate = formatDate(bookingDate, 'yyyy-MM-dd HH:mm:ss', 'en-US');
    this._router.navigate(['addBooking'], { queryParams: { date: formattedDate } });
  }

  loadUser() {
    this.identity = this._crudService.getIdentity();
    this.token = this._crudService.getToken();
  }

  getBooking(){
    this._crudService.listObjects(this.token, "booking").subscribe(  //el metodo subscribe viene por el tipo observable que hemos declarado en el servicio
      (response) => {
        this.bookings = [...response.$model];
      },
      (error) => {
        // Manejar el error aquí
        console.error(error);
      }
    );
  }

  isBooked(date: any, time: any): any{
    const bookingDateTime = new Date(date);
    const [hours, minutes] = time.split(':');
    
    bookingDateTime.setHours(Number(hours));
    bookingDateTime.setMinutes(Number(minutes));
    bookingDateTime.setSeconds(0);
    bookingDateTime.setMilliseconds(0);
    
    for (const booking of this.bookings) {
      const dbDateTime = new Date(booking.date_booking.replace(' ', 'T'));
      dbDateTime.setSeconds(0); // Establecer los segundos a cero
      dbDateTime.setMilliseconds(0);
    
      if (bookingDateTime.getTime() === dbDateTime.getTime()) {
        const res = [booking.id_booking,booking.id_user];
        return res;// La fecha y hora coinciden con una reserva existente
      }
    }
    
    return false; // No se encontró ninguna reserva para la fecha y hora especificadas
  }


  updateBookingDate(id_booking:any){
    this._router.navigate(['updateBooking'], { queryParams: { id:id_booking } });
  }
}
