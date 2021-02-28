/* 
  Pani
*/

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//  Modelo
import { Alumno } from 'src/app/modelos/alumno.interface';
//  servicio
import { AlumnoService } from '../alumno.service';
import { FlasisService } from 'src/app/flasis.service';



@Component({
  selector: 'flaSis-alumnoListado',
  templateUrl: './alumno-listado.component.html',
  styleUrls: ['./alumno-listado.component.css']
})
export class AlumnoListadoComponent implements OnInit {

  //alumnos$: this.servicioAlumno.alumnos;
  //alumnos: Alumno[] = [];
  alumno: Alumno;
  alumnos$: any;
  modo= 'LISTAR';
  titulo = 'Listado de alumnos';
  // displayedColumns: string[] = ['apellido', 'nombre', 'dni', 'acciones'];
  // dataSource = alumnos;

  constructor(
    private servicioFasis:FlasisService,
    private servicioAlumno: AlumnoService,
    private router: Router
    ) { 
      this.alumnos$ = this.servicioAlumno.alumnos;
      //this.formularioIniciar();
    }

  ngOnInit() {  }


  //  Lista    - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
  
  listadoIniciar() {
    //this.alumnos$ = this.servicioAlumno.alumnos;
    //this.alumnos$ = this.servicioAlumno.alumnosTraer();
    //this.servicioAlumno.alumnosTraer().subscribe(      (infoAlumnos) => {  this.alumnos$ = infoAlumnos;}   );
    this.servicioAlumno.alumnosTraer();
    this.modo = 'LISTAR';
  }

  clickBorrar(alumnoId: string) {    this.servicioAlumno.alumnoEliminar(alumnoId);  }
  clickCrear() {    this.servicioFasis.navegarA('alumno/'); }
  clickEdiar(alumno: Alumno) {    this.servicioFasis.navegarA('alumno/'+ alumno.id);  }
  /* console.log('EDITAR => ' + JSON.stringify(alumno));    this.titulo = 'Editar alumno ' + alumno.apellido + ' ' + alumno.nombre;    this.alumno = alumno;    //this.formularioIniciar();    //this.modo = 'EDITAR';    let ruta = 'alumno/'+ alumno.id;    console.log(' ruta ' + ruta); */

  clickVer(alumno: Alumno) {
    console.log('VER => ' + JSON.stringify(alumno));
    this.alumno = alumno;
    //this.formularioIniciar();
    this.modo = 'VER';
  }
  



}
