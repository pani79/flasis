/* 
  PAni
*/



import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "src/app/modulos/material/material.module";

import { CursoComponent } from './curso.component';
import { CursoListadoComponent } from './curso-listado.component';



@NgModule({
  declarations: [CursoComponent, CursoListadoComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports: [CursoComponent]
})
export class CursoModule { }
