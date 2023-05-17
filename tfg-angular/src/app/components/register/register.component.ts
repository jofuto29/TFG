import { Component } from '@angular/core';
import { user } from '../../models/user';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

    public page_title: string;
    public user: user;

    constructor(){
      this.page_title = "Registrate";
      this.user = new user(1,'','','','','user',2,'',2,'','');


    /* del formulario recibiremos los parametros para poder crear el objeto creectamente
      public id_user: number,
        public user: string,
        public userName: string,
        public lastName:string,
        public email: EmailValidator,
        public rol: string,
        public phoneNumber: number,
        public pass: string,
        public dni: number,
        public created_at: any,
        public updated_at:any
        */
    }

    onSubmit(form: any){

    }
}
