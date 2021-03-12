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
import { Curso } from 'src/app/modelos/curso.interface';
//  servicio
import { CursoService } from '../curso.service';
import { FlasisService } from 'src/app/flasis.service';


@Component({
  selector: 'app-curso-listado',
  templateUrl: './curso-listado.component.html',
  styleUrls: ['./curso-listado.component.css']
})
export class CursoListadoComponent implements OnInit, AfterViewInit {


  curso: Curso;
  cursos$: any;
  modo= 'LISTAR';
  titulo = 'Listado de cursos';
  
  displayedColumns: string[] = ['id', 'institucion', 'nombre', 'nivel', 'division', 'tipo', 'acciones'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private servicioFasis:FlasisService,
    private servicioCurso: CursoService,
    private router: Router
    ) { 
      //this.cursos$ = this.servicioCurso.cursos;
      //this.formularioIniciar();
    }

  ngOnInit() {
    this.servicioCurso.cursosObtener().subscribe(
      cursos => {this.dataSource.data = cursos}
    )
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  //  Lista    - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
  
  clickBorrar(cursoId: string) {    this.servicioCurso.cursoEliminar(cursoId);  }
  clickCrear() {    this.servicioFasis.navegarA('curso/'); }
  clickEdiar(curso: Curso) {    this.servicioFasis.navegarA('curso/'+ curso.id);  }
  /* console.log('EDITAR => ' + JSON.stringify(curso));    this.titulo = 'Editar curso ' + curso.apellido + ' ' + curso.nombre;    this.curso = curso;    //this.formularioIniciar();    //this.modo = 'EDITAR';    let ruta = 'curso/'+ curso.id;    console.log(' ruta ' + ruta); */

  clickVer(curso: Curso) {
    console.log('VER => ' + JSON.stringify(curso));
    this.curso = curso;
    //this.formularioIniciar();
    this.modo = 'VER';
  }
  



}
