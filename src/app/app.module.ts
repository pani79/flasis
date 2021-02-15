import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './componentes/paginas/generales/home/home.component';
import { HeaderComponent } from './componentes/interface/pagina/header/header.component';
//import { AlumnoComponent } from './componentes/modulos/alumno/alumno.component';
import { AlumnoModule } from './componentes/modulos/alumno/alumno.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestore } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent
    //,    AlumnoModule
    //AlumnoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AlumnoModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  providers: [AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule { }
