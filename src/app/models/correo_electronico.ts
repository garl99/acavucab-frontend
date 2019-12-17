export class Correo_electronico{
    
    constructor(
        public id:number,
        public correo:string,
        public fk_clienten:number,
        public fk_clientej:number,
        public fk_empleado:number,
        public fk_proveedor:number
    ){}
}

