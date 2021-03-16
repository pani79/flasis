import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './componentes/paginas/generales/home/home.component';
import { PaginanoencontradaComponent } from './componentes/paginas/generales/paginanoencontrada/paginanoencontrada.component';

import { AlumnoComponent } from './componentes/modulos/alumno/alumno.component';
import { AlumnoListadoComponent } from './componentes/modulos/alumno/alumno-listado.component';
import { CursoComponent } from './componentes/modulos/curso/curso.component';
import { CursoListadoComponent } from './componentes/modulos/curso/curso-listado.component';
import { InstitucionComponent } from './componentes/modulos/institucion/institucion.component';
import { InstitucionListadoComponent } from './componentes/modulos/institucion/institucion-listado.component';
import { TpComponent } from './componentes/modulos/tp/tp.component';
import { TpListadoComponent } from './componentes/modulos/tp/tp-listado.component';
import { TpAsignacionComponent } from './componentes/modulos/tp-asignacion/tp-asignacion.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'alumno/:id', component: AlumnoComponent },
  { path: 'alumnos', component: AlumnoListadoComponent },
  { path: 'curso/:id', component: CursoComponent },
  { path: 'cursos', component: CursoListadoComponent },
  { path: 'home', component: HomeComponent },
  { path: 'institucion/:id', component: InstitucionComponent },
  { path: 'instituciones', component: InstitucionListadoComponent },
  { path: 'trabajopractico/:id', component: TpComponent },
  { path: 'trabajospracticos', component: TpListadoComponent },
  { path: 'trabajospracticos/asignacion', component: TpAsignacionComponent },
  { path: '**', component: PaginanoencontradaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
