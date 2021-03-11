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
import { Tp } from 'src/app/modelos/tp.interface';
//  servicio
import { TpService } from '../tp.service';
import { FlasisService } from 'src/app/flasis.service';

@Component({
  selector: 'app-tp-listado',
  templateUrl: './tp-listado.component.html',
  styleUrls: ['./tp-listado.component.css']
})
export class TpListadoComponent implements OnInit, AfterViewInit {

  //tps$: this.servicioTp.tps;
  //tps: Tp[] = [];
  tp: Tp;
  tps$: any;
  modo= 'LISTAR';
  titulo = 'Listado de tps';
  
  displayedColumns: string[] = ['titulo', 'denominacion', 'descripcion', 'estado', 'acciones'];
  dataSource = new MatTableDataSource();
  infoPagina =  {titulo: 'Trabajos prácticos', info: 'Listado de trabajos prácticos.'}
  

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private servicioFasis:FlasisService,
    private servicioTp: TpService,
    private router: Router
    ) { 
      //this.tps$ = this.servicioTp.tps;
      //this.formularioIniciar();
    }

  ngOnInit() {
    this.servicioTp.tpsObtener().subscribe(
      tps => {this.dataSource.data = tps}
    )
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  //  Lista    - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
  
  clickBorrar(tpId: string) {    this.servicioTp.tpEliminar(tpId);  }
  clickCrear() {    this.servicioFasis.navegarA('trabajopractico/'); }
  clickEdiar(tp: Tp) {    this.servicioFasis.navegarA('trabajopractico/'+ tp.id);  }
  /* console.log('EDITAR => ' + JSON.stringify(tp));    this.titulo = 'Editar tp ' + tp.apellido + ' ' + tp.nombre;    this.tp = tp;    //this.formularioIniciar();    //this.modo = 'EDITAR';    let ruta = 'tp/'+ tp.id;    console.log(' ruta ' + ruta); */

  clickVer(tp: Tp) {
    console.log('VER => ' + JSON.stringify(tp));
    this.tp = tp;
    //this.formularioIniciar();
    this.modo = 'VER';
  }
  



}
