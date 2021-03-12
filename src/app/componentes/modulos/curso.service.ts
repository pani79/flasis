/* 
  PAni
*/



import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { AngularFirestoreCollection, AngularFirestore } from "@angular/fire/firestore";
import 'firebase/firestore';
//import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

import { Curso } from 'src/app/modelos/curso.interface';
import { Institucion } from 'src/app/modelos/institucion.interface';
//import { async } from '@angular/core/testing';


@Injectable({
  providedIn: 'root'
})


export class CursoService {

  cursos: Observable<Curso[]>;
  cc: AngularFirestoreCollection<Curso>;
  private cursosColleccion: AngularFirestoreCollection<Curso>;

  constructor(
    private readonly afs: AngularFirestore
    //, public db: AngularFireDatabase
  ) { 
    this.cursosColleccion = afs.collection<Curso>('cursos');
    this.cursosObtener();
  }


  cursoObtenerPorInstitucion(idInstitucion: string)  {
    return this.afs.collection(
      'cursos', ref => {
        // declare var `query` of type either `CollectionReference` or `Query`
        let query: firebase.firestore.CollectionReference | firebase.firestore.Query = ref;

        // 👇 the below conditions will be applied to query
        // 👇 only when params have value in given `employee` object.

        // where condition to match employee with given phone
        //if (employee.phone) {
          query = query.where('institucion_id', '==', idInstitucion);
        //}
        return query;
      }).snapshotChanges();


    //return this.afs.collection<Curso[]>('cursos', ref => ref.where('institucion_id', '==', idInstitucion)).snapshotChanges()
    
    /*
      this.afs.collection('cursos', ref => ref.where('institucion_id', '==', idInstitucion)).valueChanges().subscribe(
        curso => {
          console.log(curso);
          cursos.push(curso)
        } 
      );
    */
    //console.log('cursos > ' + JSON.stringify(cursos));
    //return this.cursos
    /* 
        this.afs.collection<Curso>('cursos', ref => {
          ref.where('size', '==', size)).valueChanges()
        });
        let items = this.cursosColleccion.list('/candidates_list',{
          query:{
            orderByChild:'email',
            equalTo:'pranavkeke@gmail.com'
          }})
          .map(item => item.FirstName) as FirebaseListObservable<any[]>;
    
        var query = this.cursosColleccion.where("capital", "==", true);
        return query
     */
    //debugger;
    //this.db.list('/cursos', ref => ref.orderByChild('institucion_id').equalTo(idInstitucion));
    //return this.cursosColleccion.doc(id).snapshotChanges();
    //this.firestore.collection('cats').doc(documentId).snapshotChanges();
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

  

  cursoGuardar(curso: Curso, cursoId: string): Promise<any> {
    console.log('InstitucionGuardar => ' + JSON.stringify(curso));
    console.log('cursoId => ' + cursoId);
    return new Promise( async (resolve, rejecct) => {
      try {
        const id = cursoId || this.afs.createId();
        const info = {id, ...curso};
        console.log('por guardar como > ' + id);
        const resultado = await this.cursosColleccion.doc(id).set(info);
        console.log('guardado como > ' + id);
        
        resolve(id);
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
