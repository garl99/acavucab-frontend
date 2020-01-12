export class DataVenta{

    constructor(
        public id:number,
        public cantidad_cervezas: number,
        public rol:string,
        public cliente_id:number,
        public canjeo:number,
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


export class DataVenta3{

    constructor(
        public cervezas:any,
        public rol:string,
        public cliente_id:number,
        public pago: any,
        public carrito: boolean,
        public bandera_evento: number,
        public evento_id:number,
        public resp_id:number,
    ){}

}