export class services{

    constructor(
        public id_service: number,

        public serviceName: string,
        public description: string,
        public price: number,
        public serviceType: string,
        public duration: number,
        
        public created_at: any,
        public updated_at:any,
    ){
    }
}