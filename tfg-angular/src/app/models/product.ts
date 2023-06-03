
export class product{

    constructor(
        public id_product: number,
        public id_supplier: number,
        public id_category: number,
        public productName: string,
        public description:string,
        public price: number,
        public stock: number,
        public admisionDate: Date,
        public expiryDate: Date,
        public location: string,
        public img: string,
        public created_at: any,
        public updated_at:any,
        public marca:any
    ){
    }
}