/* 
  Pani
*/


import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

//  Modelo
import { TpAsignacion } from 'src/app/modelos/tpAsignacion.interface';

//  servicio
import { TpAsignacionService } from 'src/app/componentes/modulos/tp-asignacion.service';



@Component({
  selector: 'app-tpaeditar',
  templateUrl: './tpaeditar.component.html',
  styleUrls: ['./tpaeditar.component.css']
})
export class TpaeditarComponent implements OnInit {

  modoEditar = false
  tpA: TpAsignacion
  formularioTPA: FormGroup
  @Input() inputTpas: TpAsignacion

  constructor(
    private fb: FormBuilder,
    private servicioTpAsigna: TpAsignacionService
  ) {
    this.configuracionInicial(); 
  }
  
  ngOnInit() {
  }

  configuracionInicial() {
      this.tpA = this.inputTpas
      this.formularioTPA = this.fb.group({
        calificacion: ['', Validators.required],
        nota: ['', Validators.required],
        estado: ['', Validators.required],
        comentarios: ['', Validators.required]
      });
      //this.formularioTPA.patchValue(this.inputTpas)
  }

  estadoCambia(){ this.modoEditar = (this.modoEditar === false) ? true : false }

  //  ABM

  tpaGraba() {}

}
