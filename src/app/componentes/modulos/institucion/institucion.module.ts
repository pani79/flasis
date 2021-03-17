/* 
  Pani
*/

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "src/app/modulos/material/material.module";


import { InstitucionComponent } from './institucion.component';
import { InstitucionListadoComponent } from './institucion-listado.component';
import { CursoModule } from 'src/app/componentes/modulos/curso/curso.module';



@NgModule({
  declarations: [InstitucionComponent, InstitucionListadoComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CursoModule,
    MaterialModule
  ],
  exports: [InstitucionComponent]
})
export class InstitucionModule { }
