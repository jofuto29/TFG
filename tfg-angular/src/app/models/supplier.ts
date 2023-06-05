import { EmailValidator } from "@angular/forms";

export class supplier{

    constructor(
        public id_supplier: number,
        public supplierName: string,
        public lastName:string,
        public email: string,
        public phoneNumber: number,
        public dni: number,
        public address: string,
        public created_at: any,
        public updated_at:any
    ){
    }
}