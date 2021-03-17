import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CuadroavisoComponent } from 'src/app/componentes/elementos/cuadroaviso/cuadroaviso.component';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [CuadroavisoComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [CuadroavisoComponent]
})
export class CompartidosModule { }
