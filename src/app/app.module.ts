import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './componentes/paginas/generales/home/home.component';
import { HeaderComponent } from './componentes/interface/pagina/header/header.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { environment } from 'src/environments/environment';

import { AlumnoModule } from './componentes/modulos/alumno/alumno.module';
import { InstitucionModule } from './componentes/modulos/institucion/institucion.module';
import { TpModule } from './componentes/modulos/tp/tp.module';

import { CursoModule } from './componentes/modulos/curso/curso.module';
import { PaginanoencontradaComponent } from './componentes/paginas/generales/paginanoencontrada/paginanoencontrada.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TpComponent } from './componentes/modulos/tp/tp.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    PaginanoencontradaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AlumnoModule,
    InstitucionModule,
    TpModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    CursoModule,
    BrowserAnimationsModule,
    TpModule
  ],
  providers: [AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule { }
