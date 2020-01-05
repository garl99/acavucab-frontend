export class EventC{

    constructor(
       
        public nombre:string,
	    public descripcion:string,
	    public cantidad_entrada_inicial: number,
        public cantidad_entrada_actual: number,
        public precio_entrada:number,
        public fecha: string, 
        public fk_lugar: number,
        public proveedores: any[],
        public cervezas:any[],

    ){}

}

export class EventU{

    constructor(
       
        public nombre:string,
	    public descripcion:string,
	    public cantidad_entrada_inicial: number,
        public cantidad_entrada_actual: number,
        public precio_entrada:number,
        public fecha: string, 
        public fk_lugar: number,

    ){}

}