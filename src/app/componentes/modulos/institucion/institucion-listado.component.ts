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
import { Institucion } from 'src/app/modelos/institucion.interface';
//  servicio
import { InstitucionService } from '../institucion.service';
import { FlasisService } from 'src/app/flasis.service';


@Component({
  selector: 'app-institucion-listado',
  templateUrl: './institucion-listado.component.html',
  styleUrls: ['./institucion-listado.component.css']
})
export class InstitucionListadoComponent implements OnInit {

  institucion: Institucion;
  modo= 'LISTAR';
  titulo = 'Listado de institucions';
  
  displayedColumns: string[] = ['nombre', 'descripcion', 'nivel', 'acciones'];
  dataSource = new MatTableDataSource();
  infoPagina =  {titulo: 'Instituciones', info: 'Listado de instituciones.'}

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private servicioFasis:FlasisService,
    private servicioInstitucion: InstitucionService,
    private router: Router
    ) { 
      //this.institucions$ = this.servicioInstitucion.institucions;
      //this.formularioIniciar();
    }

  ngOnInit() {
    this.servicioInstitucion.institucionesObtener().subscribe(
      institucions => {this.dataSource.data = institucions}
    )
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  //  Lista    - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
  
  clickBorrar(institucionId: string) {    this.servicioInstitucion.institucionEliminar(institucionId);  }
  clickCrear() {    this.servicioFasis.navegarA('institucion/'); }
  clickEdiar(institucion: Institucion) {    this.servicioFasis.navegarA('institucion/'+ institucion.id);  }
  /* console.log('EDITAR => ' + JSON.stringify(institucion));    this.titulo = 'Editar institucion ' + institucion.apellido + ' ' + institucion.nombre;    this.institucion = institucion;    //this.formularioIniciar();    //this.modo = 'EDITAR';    let ruta = 'institucion/'+ institucion.id;    console.log(' ruta ' + ruta); */

  clickVer(institucion: Institucion) {
    console.log('VER => ' + JSON.stringify(institucion));
    this.institucion = institucion;
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
