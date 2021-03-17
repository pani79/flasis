/* 
  Pani
*/


import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "src/app/modulos/material/material.module";

import { TpAsignacionComponent } from "./tp-asignacion.component";
import { CompartidosModule } from 'src/app/modulos/compartidos/compartidos.module';
//import { CuadroavisoComponent } from '../../elementos/cuadroaviso/cuadroaviso.component';


@NgModule({
  declarations: [TpAsignacionComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CompartidosModule,
    MaterialModule
  ], 
  exports: [TpAsignacionComponent]
})
export class TpAsignacionModule { }
