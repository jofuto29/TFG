export class paymentMethod{

    constructor(
        public id_card: number,
        public id_user: number,
        public cardNumber: string,
        public cardName: string,
        public cardSecurity: string,
        public cardExpiryDate: string,
        public created_at: any,
        public updated_at:any,

    ){
    }
}