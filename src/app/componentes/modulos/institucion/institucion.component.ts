/* 
  Pani
*/

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
//  Modelo
import { Institucion } from 'src/app/modelos/institucion.interface';
import { Curso } from 'src/app/modelos/curso.interface';
//  Servicios
import { FlasisService } from 'src/app/flasis.service';
import { InstitucionService } from '../institucion.service';
import { CursoService } from '../curso.service';
//  Datos
import { CURSO_TIPOS } from 'src/app/informacion/datos';



@Component({
  selector: 'app-institucion',
  templateUrl: './institucion.component.html',
  styleUrls: ['./institucion.component.css']
})
export class InstitucionComponent implements OnInit {

  institucion: any;
  formularioInstitucion: FormGroup;
  modo: string;
  instituciones: Institucion[];
  cursos: Curso[] = [];
  niveles:{}[];
  //sexos = [];
  cargaInfo = {
    cargando: true,
    titulo: 'Cargando',
    detalle: 'Cargando metadatos en proceso.'
  }
  infoPagina =  {titulo: 'Batman', info: 'BW'}
  infoHijo = {}

  constructor(
    private ruta: ActivatedRoute,
    private servicioFasis:FlasisService,
    private servicioInstitucion: InstitucionService,
    private servicioCurso: CursoService,
    private fb: FormBuilder,
    private router: Router,
    private location: Location
    ) { 
      this.niveles = CURSO_TIPOS;
      //this.institucions$ = this.servicioInstitucion.institucions;
      //this.formularioIniciar();
    }

  ngOnInit() { 
    this.cargaInfo.titulo = 'Preparando';
    this.institucionObtiene(); 
  }
  
  clickIrAlListado() {    this.servicioFasis.navegarA('instituciones'); }
  
  formularioClickOpcion (valor, valor2) {
    console.log('formularioClickOpcion REVEER');
  }

  institucionObtiene() {
    console.log('institucionObtiene');
    const id = this.ruta.snapshot.paramMap.get('id');
    console.log(id);
    if(id !== '') {
      this.servicioInstitucion.institucionObtenerPorId(id).subscribe(
        (institucion) => {
          this.institucion = institucion.payload.data();
          console.log('institucion => ' + this.institucion.nombre);
          console.log('institucion = ' + JSON.stringify(this.institucion));
          this.formularioIniciar();
          this.modo = 'EDITAR';
          this.servicioCurso.cursoObtenerPorInstitucion(this.institucion.id).subscribe(
            (info) => { 
              this.cursos  = info.map(e => {
                return {
                  id: e.payload.doc.id,
                  ...e.payload.doc.data()
                } as Curso;
              });
            }
          );
          console.log('cursos')
          console.log(JSON.stringify(this.cursos))
          this.infoPagina =  {titulo: 'Editar aulmno', info: 'Aca champion vas a poder editar al chango.'}
          this.cargaInfo.cargando = false;
          this.infoHijo = { institucion: this.institucion}
          this.servicioCurso.cursoObtenerPorInstitucion(this.institucion.id)
        }
      );
    } else if(id === '') {
      this.cargaInfo.cargando = false;
      this.formularioIniciar();
      this.infoPagina =  {titulo: 'Crear una nueva institución', info: 'Dale, rellena al chango.'}
      this.modo = 'CREAR';
    } else {  console.log('UOPPPS <= '); }
  }



  //  Crea | Edita    - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

  formularioIniciar() {
    this.formularioInstitucion = this.fb.group({
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      nivel: [null, [Validators.required]]
    });
    if (typeof this.institucion === 'undefined') {
      // this.router.navigate(['new']);
      this.institucion = { id: null, nombre: null, descripcion: null, nivel: null }
    } else {
      console.log('relleno');
      this.formularioInstitucion.patchValue(this.institucion);
    }
  }

  guardar() {
    console.log('Saved', this.formularioInstitucion.value);
    const institucion = this.formularioInstitucion.value;
    const institucionId = this.institucion.id || null;
    /* const institucionId = this.institucion?.id || null; */
    let resultado = this.servicioInstitucion.institucionGuardar(institucion, institucionId)
    .then(
      (res) => {
        console.log(res)
        institucion.id = res
      }
    );
    console.log('r => ' + JSON.stringify(resultado));
    this.formularioInstitucion.controls['nombre'].disable();
    this.formularioInstitucion.controls['descripcion'].disable();
    this.formularioInstitucion.controls['nivel'].disable();
    this.infoHijo['institucion'] = institucion;
    this.servicioCurso.cursoObtenerPorInstitucion(institucion.id).subscribe(
      (info) => { 
        this.cursos  = info.map(e => {
          return {
            id: e.payload.doc.id,
            ...e.payload.doc.data()
          } as Curso;
        });
      }
    );
    this.modo ='EDITAR';
    console.log('cursos')
    console.log(JSON.stringify(this.cursos))
  }
  
  modificar() {
    console.log('modificar', this.formularioInstitucion.value);
    const institucion = this.formularioInstitucion.value;
    const institucionId = this.institucion.id || null;
    //console.log('institucionId', institucionId);
    console.log('institucionId', institucionId);
    /* const institucionId = this.institucion?.id || null; */
    this.servicioInstitucion.institucionGuardar(institucion, institucionId);
  }

  
  
}
