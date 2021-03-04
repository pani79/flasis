/* 
  PAni
*/



import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
//  Modelo
import { Curso } from 'src/app/modelos/curso.interface';
import { Institucion } from 'src/app/modelos/institucion.interface';
//  Servicios
import { FlasisService } from 'src/app/flasis.service';
import { CursoService } from '../curso.service';
import { InstitucionService } from '../institucion.service';
//  Datos
import { CURSO_TIPOS } from 'src/app/informacion/datos';
import { JsonpClientBackend } from '@angular/common/http';



@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css']
})
export class CursoComponent implements OnInit {

  curso: any;
  formularioCurso: FormGroup;
 // cursos$: any;
  modo= 'LISTAR';
  titulo = 'Listado de cursos';
  instituciones: Institucion[]=[];
  tipoCursos: {};
  cargaInfo = {
    cargando: true,
    titulo: 'Cargando',
    detalle: 'Cargando metadatos en proceso.'
  }
  infoPagina =  {titulo: 'Batman', info: 'BW'}

  @Input() inputInfo: {};


  constructor(
    private servicioFasis:FlasisService,
    private servicioCurso: CursoService,
    private servicioInstitucion: InstitucionService,
    private fb: FormBuilder,
    private ruta: ActivatedRoute,
    private router: Router,
    private location: Location
    ) { 
      this.tipoCursos = CURSO_TIPOS;
    }

  ngOnInit() {
    console.log('input > ' + JSON.stringify(this.inputInfo));
    console.log(this.inputInfo);
    /* 
      cargaInfo = {
        cargando: true,
        titulo: 'Cargando',
        detalle: 'Cargando metadatos en proceso.'
      }
    */
    this.cargaInfo.titulo = 'Preparando'; 
    if(this.inputInfo === undefined) {
      console.log('e UNDEFINED'); 
      this.infoObtieneInstituciones();
      //this.cargaInfo.cargando = false;
      this.formularioIniciar();
      this.infoPagina =  {titulo: 'Crear un curso nuevo', info: 'Dale, rellena al chango.'}
      this.modo = 'CREAR';
    }else {
      const id = this.ruta.snapshot.paramMap.get('id');
      console.log(id);
      if(id !== '') {
        this.infoObtieneInstitucion(id)
      } else {  console.log('UOPPPS <= '); }
    }   
    if(this.inputInfo) this.cursoObtiene(); 
  }
  
  infoObtieneInstituciones() {
    this.servicioInstitucion.institucionesObtener().subscribe(
      infoInstituciones => {
        this.instituciones = infoInstituciones;
        this.cargaInfo.cargando = false; 
      }
    );
  }

  infoObtieneInstitucion(id: string) {
    this.servicioCurso.cursoObtenerPorId(id).subscribe(
      (curso) => {
        this.curso = curso.payload.data();
        console.log('curso => ' + this.curso.nombre);
        console.log('curso = ' + JSON.stringify(this.curso));
        this.formularioIniciar();
        this.modo = 'EDITAR';
        this.infoPagina =  {titulo: 'Editar curso', info: 'Aca champion vas a poder editar al chango.'}
        this.cargaInfo.cargando = false;
      }
    );
  }

  cursoObtiene() {
    console.log('cursoObtiene');
    const id = this.ruta.snapshot.paramMap.get('id');
    console.log(id);
    if(id !== '') {
      this.servicioCurso.cursoObtenerPorId(id).subscribe(
        (curso) => {
          this.curso = curso.payload.data();
          console.log('curso => ' + this.curso.nombre);
          console.log('curso = ' + JSON.stringify(this.curso));
          this.formularioIniciar();
          this.modo = 'EDITAR';
          this.infoPagina =  {titulo: 'Editar curso', info: 'Aca champion vas a poder editar al chango.'}
          this.cargaInfo.cargando = false;
        }
      );
    } else if(id === '') {
      this.cargaInfo.cargando = false;
      this.formularioIniciar();
      this.infoPagina =  {titulo: 'Crear un curso nuevo', info: 'Dale, rellena al chango.'}
      this.modo = 'CREAR';
    } else {  console.log('UOPPPS <= '); }
  }

  
  clickIrAlListado() {    this.servicioFasis.navegarA('cursos'); }
  
  formularioClickOpcion (valor, valor2) {
    console.log('formularioClickOpcion REVEER');
  }
  

  //  Crea | Edita    - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
  
  formularioIniciar() {
    this.formularioCurso = this.fb.group({
      institucion: ['', [Validators.required]],
      tipo_curso: [''],
      nombre: ['', [Validators.required]],
      nivel: [null, [Validators.required]],
      division: [null]
    });
    if (typeof this.curso === 'undefined') {
      // this.router.navigate(['new']);
      this.curso = { id: null, nombre: null, institucion: null, nivel: null, division: null, tipo: null }
    } else {
      console.log('relleno');
      this.formularioCurso.patchValue(this.curso);
    }
  }

  guardar() {
    console.log('Saved', this.formularioCurso.value);
    const curso = this.formularioCurso.value;
    const cursoId = this.curso.id || null;
    /* const cursoId = this.curso?.id || null; */
    this.servicioCurso.cursoGuardar(curso, cursoId);
  }
  
  modificar() {
    console.log('modificar', this.formularioCurso.value);
    const curso = this.formularioCurso.value;
    const cursoId = this.curso.id || null;
    //console.log('cursoId', cursoId);
    console.log('cursoId', cursoId);
    /* const cursoId = this.curso?.id || null; */
    this.servicioCurso.cursoGuardar(curso, cursoId);
  }


}
