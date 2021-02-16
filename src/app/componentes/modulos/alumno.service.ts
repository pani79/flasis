import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AngularFirestoreCollection, AngularFirestore } from "@angular/fire/firestore";
import { Alumno } from 'src/app/modelos/alumno.interface';
//import { async } from '@angular/core/testing';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

  alumnos: Observable<Alumno[]>;
  private alumnosColleccion: AngularFirestoreCollection<Alumno>;

  constructor(private readonly afs: AngularFirestore) { 
    this.alumnosColleccion = afs.collection<Alumno>('alumnos');
    this.alumnosObtener();
  }


  private alumnosObtener(): void {
    this.alumnos = this.alumnosColleccion.snapshotChanges().pipe(
      map( actions => actions.map(
        a => a.payload.doc.data() as Alumno
      ))
    );
  }

  alumnosTraer() {
    //return this.afs.collection('alumnos').snapshotChanges();  
    this.alumnos = this.alumnosColleccion.snapshotChanges().pipe(
      map( actions => actions.map(
        a => a.payload.doc.data() as Alumno
      ))
    );
  }
  
  alumnoGuardar(alumno: Alumno, alumnoId: string): Promise<void> {
    console.log('alumnoGuardar => ' + JSON.stringify(alumno));
    console.log('alumnoId => ' + alumnoId);
    return new Promise( async (resolve, rejecct) => {
      try {
        const id = alumnoId || this.afs.createId();
        const info = {id, ...alumno};
        const resultado = await this.alumnosColleccion.doc(id).set(info);
        resolve(resultado);
      } catch (error) {
        rejecct(error.message)
      }
    })
  }
  
  alumnoEliminar(alumnoId: string): Promise<void> {
    return new Promise( async (resolve, rejecct) => {
      try {
        const resultado = await this.alumnosColleccion.doc(alumnoId).delete();
        resolve(resultado);
      } catch (error) {
        rejecct(error.message)
      }
    })
  }



}
