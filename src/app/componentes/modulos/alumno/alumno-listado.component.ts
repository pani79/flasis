/* 
  Pani
*/

import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
//  Material
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
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
export class AlumnoListadoComponent implements OnInit, AfterViewInit {

  //alumnos$: this.servicioAlumno.alumnos;
  //alumnos: Alumno[] = [];
  alumno: Alumno;
  //alumnos$: any;
  modo= 'LISTAR';
  titulo = 'Listado de alumnos';
  
  displayedColumns: string[] = ['apellido', 'nombre', 'sexo', 'institucion', 'curso', 'division', 'acciones'];
  dataSource = new MatTableDataSource();
  infoPagina =  {titulo: 'Alumnos', info: 'Listado de alumnos.'}

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private servicioFasis:FlasisService,
    private servicioAlumno: AlumnoService,
    private router: Router
    ) { 
      //this.alumnos$ = this.servicioAlumno.alumnos;
      //this.formularioIniciar();
    }

  ngOnInit() {
    this.servicioAlumno.alumnosObtener().subscribe(
      alumnos => {this.dataSource.data = alumnos}
    )
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  //  Lista    - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
  
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
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
