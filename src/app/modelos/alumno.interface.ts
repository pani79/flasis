export interface Alumno {
    id?: string;
    nombre: string;
    apellido: string;
    sexo: number;
    // sexo: string;
    email: string;
    institucion: string;
    curso: string;
    division: string;
    comentarios?: string;
}