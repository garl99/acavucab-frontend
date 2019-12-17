export class DataVenta{

    constructor(
        public id:number,
        public cantidad_cervezas: number,
        public rol:string,
        public cliente_id:number,
        public pago: any,
    ){}

}

export class DataVenta2{

    constructor(
        public cervezas:any,
        public rol:string,
        public cliente_id:number,
        public pago: any,
        public carrito: boolean
    ){}

}