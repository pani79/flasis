import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './componentes/paginas/generales/home/home.component';
import { HeaderComponent } from './componentes/interface/pagina/header/header.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestore } from '@angular/fire/firestore';

import { environment } from 'src/environments/environment';

import { AlumnoModule } from './componentes/modulos/alumno/alumno.module';
import { InstitucionModule } from './componentes/modulos/institucion/institucion.module';

import { AlumnoComponent } from './componentes/modulos/alumno/alumno.component';
import { InstitucionComponent } from './componentes/modulos/institucion/institucion.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AlumnoModule,
    InstitucionModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  providers: [AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule { }
