import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from "@angular/forms";

import { AlumnoComponent } from "./alumno.component";

@NgModule({
  declarations: [AlumnoComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [AlumnoComponent]
})
export class AlumnoModule { }
