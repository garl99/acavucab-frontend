import { Time } from '@angular/common';

export class Asistencia{

    constructor(
        public fecha: string,
        public hora_entrada:Time,
        public hora_salida: Time,
    ){}



}