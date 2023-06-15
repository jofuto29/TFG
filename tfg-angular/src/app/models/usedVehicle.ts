export class usedVechile{

    constructor(
        public id_usedVehicle: number,
        public id_vehicle: number,
        public color: string,
        public img: string,
        public opinion: string,
        public price: number,
        public year: number,
        public mileage: number,
        public numero_plazas: number,
        public fecha_matriculacion: Date,
        public proxima_revision: Date,
        public traccion: string,
        public distribucion: string,
        public largo: number,
        public alto: number,
        public ancho: number,
        public peso: number,
        public deposito: number,
        public maletero: number,
        public consumo: number,
        public emisiones: number,
        public aceleracion: number,
        public velocidad: number,
        public datos_adicionales: string | null,
        public tipo_combustible: string,
        public created_at: any,
        public updated_at:any,
    ){
    }
}