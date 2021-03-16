/* 
  Pani
*/



import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AngularFirestoreCollection, AngularFirestore } from "@angular/fire/firestore";
import { TpAsignacion } from 'src/app/modelos/tpAsignacion.interface';


@Injectable({
  providedIn: 'root'
})
export class TpAsignacionService {

  private tpAsignacionColleccion: AngularFirestoreCollection<TpAsignacion>;

  constructor(private readonly afs: AngularFirestore) {
    this.tpAsignacionColleccion = afs.collection<TpAsignacion>('tpAsignaciones'); 
  }

  
  tpAsObtener(): Observable<TpAsignacion[]> {
    return this.tpAsignacionColleccion
      .snapshotChanges()
      .pipe(
        map( actions => 
          actions.map(
            a => {
              const info = a.payload.doc.data() as TpAsignacion;
              const id =  a.payload.doc.id;
              return {id, ...info};
            }
          )
        )      
    );
  }

  tpAGuardar(tpA: TpAsignacion, tpId: string): Promise<void> {
    console.log('tpGuardar => ' + JSON.stringify(tpA));
    console.log('tpId => ' + tpId);
    return new Promise( async (resolve, rejecct) => {
      try {
        const id = tpId || this.afs.createId();
        const info = {id, ...tpA};
        const resultado = await this.tpAsignacionColleccion.doc(id).set(info);
        resolve(resultado);
      } catch (error) {
        rejecct(error.message)
      }
    })
  }


}
