/* 
  Pani
*/


import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-cuadroaviso',
  templateUrl: './cuadroaviso.component.html',
  styleUrls: ['./cuadroaviso.component.css']
})
export class CuadroavisoComponent implements OnInit {
  @Input() info:{
    
    /* 
    icono
    titulo
    texto
   */ 
  }

  constructor() { }

  ngOnInit() {
  }

}
