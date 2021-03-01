/* 
  Pani
*/



import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "src/app/modulos/material/material.module";

import { TpComponent } from './tp.component';
import { TpListadoComponent } from './tp-listado.component';



@NgModule({
  declarations: [TpComponent, TpListadoComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports: [TpComponent]
})
export class TpModule { }
