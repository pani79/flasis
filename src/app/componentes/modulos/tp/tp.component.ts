/* 
  Pani
*/

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
//  Modelo
import { Tp } from 'src/app/modelos/tp.interface';
//  servicio
import { TpService } from '../tp.service';
import { FlasisService } from 'src/app/flasis.service';

@Component({
  selector: 'app-tp',
  templateUrl: './tp.component.html',
  styleUrls: ['./tp.component.css']
})
export class TpComponent implements OnInit {

  cargaInfo = {
    cargando: true,
    titulo: 'Cargando',
    detalle: 'Cargando metadatos en proceso.'
  }
  tp: any;
  formularioTp: FormGroup;
  modo: string;
  infoPagina =  {titulo: 'Batman', info: 'BW'}

  constructor(
    private ruta: ActivatedRoute,
    private servicioFasis: FlasisService,
    private servicioTp: TpService,
    private fb: FormBuilder,
    private router: Router,
    private location: Location
    ) { 
    }

  ngOnInit() { 
    this.cargaInfo.titulo = 'Preparando';
    this.tpObtiene(); 
  }
  
  clickIrAlListado() {    this.servicioFasis.navegarA('trabajospracticos'); }
  
  formularioClickOpcion (valor, valor2) {
    console.log('formularioClickOpcion REVEER');
  }

  tpObtiene() {
    console.log('tpObtiene');
    const id = this.ruta.snapshot.paramMap.get('id');
    console.log(id);
    if(id !== '') {
      this.servicioTp.tpObtenerPorId(id).subscribe(
        (tp) => {
          this.tp = tp.payload.data();
          console.log('tp => ' + this.tp.titulo);
          console.log('tp = ' + JSON.stringify(this.tp));
          this.formularioIniciar();
          this.modo = 'EDITAR';
          this.infoPagina =  {titulo: 'Editar trabajo practico', info: 'Aca champion vas a poder editar al chango.'}
          this.cargaInfo.cargando = false;
        }
      );
    } else if(id === '') {
      this.cargaInfo.cargando = false;
      this.formularioIniciar();
      this.infoPagina =  {titulo: 'Crear un trabajo practico nuevo', info: 'Dale, rellena al chango.'}
      this.modo = 'CREAR';
    } else {  console.log('UOPPPS <= '); }
  }



  //  Crea | Edita    - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

  formularioIniciar() {
    this.formularioTp = this.fb.group({
      titulo: ['', [Validators.required]],
      denominacion: ['', [Validators.required]],
      descripcion: [null, [Validators.required]],
      estado: ['', [Validators.required]]
    });
    if (typeof this.tp === 'undefined') {
      // this.router.navigate(['new']);
      this.tp = { id: null, titulo: null, descripcion: null, denominacion: null, estado: null}
    } else {
      console.log('relleno');
      this.formularioTp.patchValue(this.tp);
    }
  }

  guardar() {
    console.log('Saved', this.formularioTp.value);
    const tp = this.formularioTp.value;
    const tpId = this.tp.id || null;
    this.servicioTp.tpGuardar(tp, tpId);
  }
     
  modificar() {
    console.log('modificar', this.formularioTp.value);
    const tp = this.formularioTp.value;
    const tpId = this.tp.id || null;
    console.log('tpId', tpId);
    this.servicioTp.tpGuardar(tp, tpId);
     
    
  }

  
}
