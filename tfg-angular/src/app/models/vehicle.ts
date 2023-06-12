export class vehicle{

    constructor(
        public id_vehicle: number,
        public id_user: number,
        
        public trademark: string,
        public model: string,
        public registration: string,
        public mileage: number,

        public created_at: any,
        public updated_at:any,
    ){
    }
}