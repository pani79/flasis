import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { InstitucionComponent } from './institucion.component';



@NgModule({
  declarations: [InstitucionComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [InstitucionComponent]
})
export class InstitucionModule { }
