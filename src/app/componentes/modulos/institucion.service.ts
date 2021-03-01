/* 
  PAni
*/



import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AngularFirestoreCollection, AngularFirestore } from "@angular/fire/firestore";
import { Institucion } from 'src/app/modelos/institucion.interface';
//import { async } from '@angular/core/testing';


@Injectable({
  providedIn: 'root'
})
export class InstitucionService {
  instituciones: Observable<Institucion[]>;
  private institucionesColleccion: AngularFirestoreCollection<Institucion>;

  constructor(private readonly afs: AngularFirestore) { 
    this.institucionesColleccion = afs.collection<Institucion>('instituciones');
    this.institucionesTraer();
  }

  private institucionesTraer():void {
    //return this.afs.collection('instituciones').snapshotChanges();  
    this.instituciones = this.institucionesColleccion.snapshotChanges().pipe(
      map( actions => actions.map(
        a => a.payload.doc.data() as Institucion
      ))
    );
  }
  institucionesObtener(): Observable<Institucion[]> {
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
  }

  /* institucionesObtener() {    return this.instituciones;  } */

  
  institucionGuardar(Institucion: Institucion, InstitucionId: string): Promise<void> {
    console.log('InstitucionGuardar => ' + JSON.stringify(Institucion));
    console.log('InstitucionId => ' + InstitucionId);
    return new Promise( async (resolve, rejecct) => {
      try {
        const id = InstitucionId || this.afs.createId();
        const info = {id, ...Institucion};
        const resultado = await this.institucionesColleccion.doc(id).set(info);
        resolve(resultado);
      } catch (error) {
        rejecct(error.message)
      }
    })
  }
  
  institucionEliminar(InstitucionId: string): Promise<void> {
    return new Promise( async (resolve, rejecct) => {
      try {
        const resultado = await this.institucionesColleccion.doc(InstitucionId).delete();
        resolve(resultado);
      } catch (error) {
        rejecct(error.message)
      }
    })
  }

}
