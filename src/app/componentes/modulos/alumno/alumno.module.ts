/* 
  Pani
*/



import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "src/app/modulos/material/material.module";
// import { MatTableModule } from '@angular/material/table';
// import { MatSortModule } from '@angular/material/sort';
// import { MatPaginatorModule } from '@angular/material/paginator';

import { AlumnoComponent } from "./alumno.component";
import { AlumnoListadoComponent } from './alumno-listado.component';

@NgModule({
  declarations: [AlumnoComponent, AlumnoListadoComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule
    // MatTableModule,
    // MatSortModule,
    // MatPaginatorModule
  ],
  exports: [AlumnoComponent]
})
export class AlumnoModule { }
