import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestore } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';


import { InstitucionComponent } from './institucion.component';



@NgModule({
  declarations: [InstitucionComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  exports: [InstitucionComponent],
  providers: [AngularFirestore]
})
export class InstitucionModule { }
