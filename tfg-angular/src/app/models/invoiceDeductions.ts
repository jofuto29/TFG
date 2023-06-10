export class invoiceDeductions{

    constructor(
        public id_invoiceDeduction: number,
        public id_invoice: number,
        public id_deduction: number,
        public created_at: any,
        public updated_at:any,
    ){
    }
}