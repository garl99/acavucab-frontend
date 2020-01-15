export class Payment{
    constructor(  
        public tipo:string,
	    public NumTarjeta:number,
	    public nombreTarjeta: string,
        public mes: number,
        public año: number,
        public cvv: number,
    ){}

}