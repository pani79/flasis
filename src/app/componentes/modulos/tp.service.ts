/* 
  Pani
*/



import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AngularFirestoreCollection, AngularFirestore } from "@angular/fire/firestore";
import { Tp } from 'src/app/modelos/tp.interface';


@Injectable({
  providedIn: 'root'
})
export class TpService {
  
  private tpColleccion: AngularFirestoreCollection<Tp>;

  constructor(private readonly afs: AngularFirestore) {
    this.tpColleccion = afs.collection<Tp>('tps'); 
  }

  
  tpsObtener(): Observable<Tp[]> {
    return this.tpColleccion
      .snapshotChanges()
      .pipe(
        map( actions => 
          actions.map(
            a => {
              const info = a.payload.doc.data() as Tp;
              const id =  a.payload.doc.id;
              return {id, ...info};
            }
          )
        )
      
    );
  }

  
  tpObtenerPorId(id: string) {
    return this.tpColleccion.doc(id).snapshotChanges();
    //this.firestore.collection('cats').doc(documentId).snapshotChanges();
  }

  /* tpsTraer() {
    //return this.afs.collection('tps').snapshotChanges();  
    this.tps = this.tpsColleccion.snapshotChanges().pipe(
      map( actions => actions.map(
        a => a.payload.doc.data() as Tp
      ))
    );
  } */
  
  tpGuardar(tp: Tp, tpId: string): Promise<void> {
    console.log('tpGuardar => ' + JSON.stringify(tp));
    console.log('tpId => ' + tpId);
    return new Promise( async (resolve, rejecct) => {
      try {
        const id = tpId || this.afs.createId();
        const info = {id, ...tp};
        const resultado = await this.tpColleccion.doc(id).set(info);
        resolve(resultado);
      } catch (error) {
        rejecct(error.message)
      }
    })
  }
  
  tpEliminar(tpId: string): Promise<void> {
    return new Promise( async (resolve, rejecct) => {
      try {
        const resultado = await this.tpColleccion.doc(tpId).delete();
        resolve(resultado);
      } catch (error) {
        rejecct(error.message)
      }
    })
  }


}
