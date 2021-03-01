export interface TpAsignacion {
    id?: string;
    id_tp: string;
    id_alumno: string;
    calificacion: number;
    nota: string;
    estado: string;
    comentarios?: string;
}