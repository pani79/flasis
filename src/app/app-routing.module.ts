import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './componentes/paginas/generales/home/home.component';
import { AlumnoComponent } from './componentes/modulos/alumno/alumno.component';
import { AlumnoListadoComponent } from './componentes/modulos/alumno/alumno-listado.component';
import { CursoComponent } from './componentes/modulos/curso/curso.component';
import { InstitucionComponent } from './componentes/modulos/institucion/institucion.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'alumno/:id', component: AlumnoComponent },
  { path: 'alumnos', component: AlumnoListadoComponent },
  { path: 'cursos', component: CursoComponent },
  { path: 'home', component: HomeComponent },
  { path: 'instituciones', component: InstitucionComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
