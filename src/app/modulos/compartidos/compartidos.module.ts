import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CuadroavisoComponent } from 'src/app/componentes/elementos/cuadroaviso/cuadroaviso.component';



@NgModule({
  declarations: [CuadroavisoComponent],
  imports: [
    CommonModule
  ],
  exports: [CuadroavisoComponent]
})
export class CompartidosModule { }
