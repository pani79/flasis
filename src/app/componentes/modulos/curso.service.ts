/* 
  PAni
*/



import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AngularFirestoreCollection, AngularFirestore } from "@angular/fire/firestore";
import { Curso } from 'src/app/modelos/curso.interface';
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


  private cursosObtener(): void {
    this.cursos = this.cursosColleccion.snapshotChanges().pipe(
      map( actions => actions.map(
        a => a.payload.doc.data() as Curso
      ))
    );
  }

  cursosTraer() {
    //return this.afs.collection('cursos').snapshotChanges();  
    this.cursos = this.cursosColleccion.snapshotChanges().pipe(
      map( actions => actions.map(
        a => a.payload.doc.data() as Curso
      ))
    );
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
