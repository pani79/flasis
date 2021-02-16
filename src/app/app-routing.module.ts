import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './componentes/paginas/generales/home/home.component';
import { AlumnoComponent } from './componentes/modulos/alumno/alumno.component';
import { InstitucionComponent } from './componentes/modulos/institucion/institucion.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'alumnos', component: AlumnoComponent },
  { path: 'instituciones', component: InstitucionComponent },
  { path: 'home', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
