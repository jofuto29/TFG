import { EmailValidator } from "@angular/forms";

export class user{

    constructor(
        public id_user: number,
        public user: string,
        public userName: string,
        public lastName:string,
        public email: string,
        public rol: string,
        public phoneNumber: number,
        public pass: string,
        public dni: number,
        public created_at: any,
        public updated_at:any
    ){
    }
}