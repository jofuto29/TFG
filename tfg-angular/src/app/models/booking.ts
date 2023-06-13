export class booking{

    constructor(
        public id_booking: number,
        public id_user: number,
        public id_vehicle: number,
        
        public date_booking: Date,

        public created_at: any,
        public updated_at:any,
    ){
    }
}