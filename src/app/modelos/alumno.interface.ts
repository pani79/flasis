export interface Alumno {
    id?: string;
    nombre: string;
    apellido: string;
    dni: number;
    // sexo: string;
    email: string;
    institucion: string;
    curso: string;
    comentarios?: string;
}