/* 
  Pani
*/

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
//  Modelo
import { Alumno } from 'src/app/modelos/alumno.interface';
import { Institucion } from 'src/app/modelos/institucion.interface';
import { Curso } from 'src/app/modelos/curso.interface';
//  Servicios
import { FlasisService } from 'src/app/flasis.service';
import { AlumnoService } from '../alumno.service';
import { InstitucionService } from '../institucion.service';
import { CursoService } from '../curso.service';
//  Datos
import { SEXOS } from 'src/app/informacion/datos';


@Component({
  selector: 'flaSis-alumno',
  templateUrl: './alumno.component.html',
  styleUrls: ['./alumno.component.css']
})
export class AlumnoComponent implements OnInit {

  //alumno: Alumno;
  //alumno: Observable< Alumno>;
  alumno: any;
  formularioAlumno: FormGroup;
  modo: string;
  instituciones: Institucion[];
  cursos: Curso[];
  sexos = [];
  cargaInfo = {
    cargando: true,
    titulo: 'Cargando',
    detalle: 'Cargando metadatos en proceso.'
  }
  infoPagina =  {titulo: 'Batman', info: 'BW'}

  constructor(
    private ruta: ActivatedRoute,
    private servicioFasis:FlasisService,
    private servicioAlumno: AlumnoService,
    private servicioInstitucion: InstitucionService,
    private servicioCurso: CursoService,
    private fb: FormBuilder,
    private router: Router,
    private location: Location
    ) { 
      this.sexos = SEXOS;
      //this.alumnos$ = this.servicioAlumno.alumnos;
      //this.formularioIniciar();
    }

  ngOnInit() { 
    this.cargaInfo.titulo = 'Preparando';
    /* this.servicioInstitucion.institucionesObtener().subscribe(
      (info) => {
        this.instituciones = info;
        this.cargaInfo.cargando = false;
      }
    ); */
    this.alumnoObtiene(); 
    this.servicioInstitucion.institucionesObtener().subscribe(
      infoInstituciones => {
        this.instituciones = infoInstituciones;
        this.servicioCurso.cursosObtener().subscribe(
          infoCursos => {
            this.cursos = infoCursos;
          }
        );
      }
    );
  }
  
  clickIrAlListado() {    this.servicioFasis.navegarA('alumnos'); }
  
  formularioClickOpcion (valor, valor2) {
    console.log('formularioClickOpcion REVEER');
  }

  alumnoObtiene() {
    console.log('alumnoObtiene');
    const id = this.ruta.snapshot.paramMap.get('id');
    console.log(id);
    if(id !== '') {
      this.servicioAlumno.alumnoObtenerPorId(id).subscribe(
        (alumno) => {
          this.alumno = alumno.payload.data();
          console.log('alumno => ' + this.alumno.nombre);
          console.log('alumno = ' + JSON.stringify(this.alumno));
          this.formularioIniciar();
          this.modo = 'EDITAR';
          this.infoPagina =  {titulo: 'Editar aulmno', info: 'Aca champion vas a poder editar al chango.'}
          this.cargaInfo.cargando = false;
        }
      );
    } else if(id === '') {
      this.cargaInfo.cargando = false;
      this.formularioIniciar();
      this.infoPagina =  {titulo: 'Crear un aulmno nuevo', info: 'Dale, rellena al chango.'}
      this.modo = 'CREAR';
    } else {  console.log('UOPPPS <= '); }
  }



  //  Crea | Edita    - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

  formularioIniciar() {
    this.formularioAlumno = this.fb.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      sexo: [null, [Validators.required]],
      email: ['', [Validators.required]],
      institucion: ['', [Validators.required]],
      curso: ['', [Validators.required]],
      //division: ['', [Validators.required]],
      comentarios: ['', [Validators.required]]
    });
    if (typeof this.alumno === 'undefined') {
      // this.router.navigate(['new']);
      this.alumno = { id: null, nombre: null, apellido: null, sexo: null, email: null, institucion: null, curso: null,  comentarios: null }// division: null,
    } else {
      console.log('relleno');
      this.formularioAlumno.patchValue(this.alumno);
    }
  }

  guardar() {
    console.log('Saved', this.formularioAlumno.value);
    const alumno = this.formularioAlumno.value;
    const alumnoId = this.alumno.id || null;
    /* const alumnoId = this.alumno?.id || null; */
    this.servicioAlumno.alumnoGuardar(alumno, alumnoId);
     
    /* 
    console.log('Saved', this.form.value);
    if (this.employeeForm.valid) {
      const employee = this.employeeForm.value;
      const employeeId = this.employee?.id || null;
      this.employeesSvc.onSaveEmployee(employee, employeeId);
      this.employeeForm.reset();
    }
 */
  }
  modificar() {
    console.log('modificar', this.formularioAlumno.value);
    const alumno = this.formularioAlumno.value;
    const alumnoId = this.alumno.id || null;
    //console.log('alumnoId', alumnoId);
    console.log('alumnoId', alumnoId);
    /* const alumnoId = this.alumno?.id || null; */
    this.servicioAlumno.alumnoGuardar(alumno, alumnoId);
     
    /* 
    console.log('Saved', this.form.value);
    if (this.employeeForm.valid) {
      const employee = this.employeeForm.value;
      const employeeId = this.employee?.id || null;
      this.employeesSvc.onSaveEmployee(employee, employeeId);
      this.employeeForm.reset();
    }
 */
  }

  
  
}
