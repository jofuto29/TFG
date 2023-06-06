export class reparation{

    constructor(
        public id_reparation: number,
        public id_vehicle: number,
        public id_invoice: number,

        public date_start: Date,
        public date_end: Date,
        public problemDescription: string,
        public solutionDescription: string,
        public state: string,

        public created_at: any,
        public updated_at:any,
    ){
    }
}