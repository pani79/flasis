/* 
  PAni
*/



import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AngularFirestoreCollection, AngularFirestore } from "@angular/fire/firestore";
import { Curso } from 'src/app/modelos/curso.interface';
import { Institucion } from 'src/app/modelos/institucion.interface';
//import { async } from '@angular/core/testing';


@Injectable({
  providedIn: 'root'
})


export class CursoService {

  cursos: Observable<Curso[]>;
  private cursosColleccion: AngularFirestoreCollection<Curso>;

  constructor(private readonly afs: AngularFirestore) { 
    this.cursosColleccion = afs.collection<Curso>('cursos');
    this.cursosObtener();
  }


   cursosObtener(): Observable<Curso[]> {
    return this.cursosColleccion
      .snapshotChanges()
      .pipe(
        map( actions => 
          actions.map(
            a => {
              const info = a.payload.doc.data() as Curso;
              const id = a.payload.doc.id;
              return {id, ...info};
            }
          )
        )
    );
  }
  /* 
  return this.institucionesColleccion
      .snapshotChanges()
      .pipe(
        map( actions => 
          actions.map(
            a => {
              const info = a.payload.doc.data() as Institucion;
              const id =  a.payload.doc.id;
              return {id, ...info};
            }
          )
        )
    );
  */

  private cursosTraer() {
    //return this.afs.collection('cursos').snapshotChanges();  
    this.cursos = this.cursosColleccion.snapshotChanges().pipe(
      map( actions => actions.map(
        a => a.payload.doc.data() as Curso
      ))
    );
  }
  
  cursoObtenerPorId(id: string) {
    return this.cursosColleccion.doc(id).snapshotChanges();
    //this.firestore.collection('cats').doc(documentId).snapshotChanges();
  }

  cursoGuardar(Curso: Curso, InstitucionId: string): Promise<void> {
    console.log('InstitucionGuardar => ' + JSON.stringify(Curso));
    console.log('InstitucionId => ' + InstitucionId);
    return new Promise( async (resolve, rejecct) => {
      try {
        const id = InstitucionId || this.afs.createId();
        const info = {id, ...Curso};
        const resultado = await this.cursosColleccion.doc(id).set(info);
        resolve(resultado);
      } catch (error) {
        rejecct(error.message)
      }
    })
  }
  
  cursoEliminar(InstitucionId: string): Promise<void> {
    return new Promise( async (resolve, rejecct) => {
      try {
        const resultado = await this.cursosColleccion.doc(InstitucionId).delete();
        resolve(resultado);
      } catch (error) {
        rejecct(error.message)
      }
    })
  }

}
