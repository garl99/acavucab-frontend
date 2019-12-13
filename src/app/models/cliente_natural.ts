export class Cliente_natural{

    constructor(
        public id:number,
        public rif:number,
        public cantidad_puntos:number,
        public cedula:number,
        public primer_nombre:string,
        public segundo_nombre:string,
        public primer_apellido:string ,
        public segundo_apellido:string,
        public fk_lugar:number
    ){}
}