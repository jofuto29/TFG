import { Component, ElementRef, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-conocenos',
  templateUrl: './conocenos.component.html',
  styleUrls: ['./conocenos.component.css'],
  providers: [UserService]
})
export class ConocenosComponent implements OnInit{
  formData = {
    name: '',
    email: '',
    message: ''
  };

  public horarioTexto: string;
  constructor(
    private _userService: UserService,
    private elementRef: ElementRef,
    private http: HttpClient) {
    this.horarioTexto = '';
  }

  ngOnInit(): void {
    const horarioElement = this.elementRef.nativeElement.querySelector('#horario');

    // Obtiene la hora actual
    const now = new Date();
    const currentHour = now.getHours();

    // Comprueba si la hora actual está dentro del rango de apertura
    if ((currentHour >= 8 && currentHour < 13) || (currentHour >= 15 && currentHour < 19)) {
      // Si está dentro del rango, agrega la clase "abierto" al elemento del horario
      horarioElement.classList.add('abierto');
      this.horarioTexto = 'Abierto';
    } else {
      // Si está fuera del rango, agrega la clase "cerrado" al elemento del horario
      horarioElement.classList.add('cerrado');
      this.horarioTexto = 'Cerrado';
    }
  }


  onSubmit(form: any) {
    if (form.valid) {

      console.log(this.formData);
      let json = JSON.stringify(this.formData);
      this._userService.sendMail(json).subscribe(
        response => {
          console.log('Correo enviado correctamente');
        },
        error => {
          console.error('Error al enviar el correo:', error);
        }
      );
    }
  }
}
