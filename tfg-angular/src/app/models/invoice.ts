export class invoices{

    constructor(
        public id_invoice: number,
        public id_reparation: number,

        public invoiceDate: Date,
        public totalPrice: number,
        public state: string,
        
        public created_at: any,
        public updated_at:any,
    ){
    }
}