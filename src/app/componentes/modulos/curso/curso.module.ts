/* 
  PAni
*/



import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from "@angular/forms";

import { CursoComponent } from './curso.component';



@NgModule({
  declarations: [CursoComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [CursoComponent]
})
export class CursoModule { }
