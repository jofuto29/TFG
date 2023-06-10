export class deduction{

    constructor(
        public id_deduction: number,

        public deductionName: string,
        public description: string,
        public percentage: number,
        public isdeduction: number,

        public created_at: any,
        public updated_at:any,
    ){
    }
}