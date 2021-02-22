/* 
  Pani
*/



import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from "@angular/forms";

import { AlumnoComponent } from "./alumno.component";
import { AlumnoListadoComponent } from './alumno-listado.component';

@NgModule({
  declarations: [AlumnoComponent, AlumnoListadoComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [AlumnoComponent]
})
export class AlumnoModule { }
