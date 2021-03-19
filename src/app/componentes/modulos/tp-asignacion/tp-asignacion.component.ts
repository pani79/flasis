/* 
  Pani
*/

import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

//  Material
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
//  Modelo
import { Alumno } from 'src/app/modelos/alumno.interface';
//  servicio
import { AlumnoService } from '../alumno.service';
import { FlasisService } from 'src/app/flasis.service';
import { InstitucionService } from '../institucion.service';
import { Institucion } from 'src/app/modelos/institucion.interface';
import { Curso } from 'src/app/modelos/curso.interface';
import { CursoService } from '../curso.service';
import { Tp } from 'src/app/modelos/tp.interface';
import { TpAsignacionService } from '../tp-asignacion.service';
import { TpService } from '../tp.service';
import { TpAsignacion } from 'src/app/modelos/tpAsignacion.interface';


@Component({
  selector: 'app-tp-asignacion',
  templateUrl: './tp-asignacion.component.html',
  styleUrls: ['./tp-asignacion.component.css']
})
export class TpAsignacionComponent implements OnInit {

  alumnos: Alumno[] = [];
  instituciones: Institucion[] = []
  cursos: Curso[] = []
  tps: Tp[] = []
  tpAs: TpAsignacion[] = []
  formularioAlumnoBusqueda: FormGroup
  infoPagina =  {titulo: 'Asignaciones', info: 'Listado de asignaciones aalumnos.'}
  infoTpas =  { icono: 'search_off', titulo: 'Asignaciones', info: 'todavia no hay'}

  constructor(
    private servicioFasis:FlasisService,
    private fb: FormBuilder,
    private servicioInstitucion: InstitucionService,
    private servicioCurso: CursoService,
    private servicioTp: TpService,
    private servicioTpAsigna: TpAsignacionService,
    private servicioAlumno: AlumnoService,
    private router: Router
  ) {
    this.cargaInicial(); 
  }

  ngOnInit() {
  }

  cargaInicial() {
    this.formularioAlumnoBusqueda = this.fb.group({
      institucion: [''],
      curso: ['']
    });
    this.servicioInstitucion.institucionesObtener().subscribe(
      (infoInstituciones) => { this.instituciones = infoInstituciones}
    )
  }

  formularioClickOpcion(tipo: string, valor: any){
    if(tipo === 'ESTABLECIMIENTO') {
      this.servicioCurso.cursoObtenerPorInstitucion(valor).subscribe(
        (infoCursos) => { 
          this.cursos  = infoCursos.map(e => {
            return {
              id: e.payload.doc.id,
              ...e.payload.doc.data()
            } as Curso;
          });
          //this.alumnosPorInstitucion(valor)
        }
      )
    } else if(tipo === 'CURSO') {
      this.alumnosPorCurso(valor)
    } else{ console.log('BIG UOOPS en  formularioClickOpcion')    }
  }
  
  //  Lista    - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
  
  alumnosPorInstitucion(idInstitucion: string) {
    this.servicioAlumno.alumnosObtenerPorInstitucion(idInstitucion).subscribe(
      (infoAlumnos) => { 
        this.alumnos  = infoAlumnos.map(e => {
            return {
              id: e.payload.doc.id,
              ...e.payload.doc.data()
            } as Alumno
          })
      }
    );
  }
  
  alumnosPorCurso(idCurso: string) {
    this.servicioAlumno.alumnosObtenerPorCurso(idCurso).subscribe( 
      (infoAlumnos) => { 
        this.alumnos  = infoAlumnos.map(e => {
          return {
            id: e.payload.doc.id,
            ...e.payload.doc.data()
          } as Alumno
        })
      }
    );
    this.tpsPorCurso('x')
    this.servicioTpAsigna.tpAsObtener().subscribe(
      (infoTpas) => this.tpAs = infoTpas
    )
  }
  
  tpsPorCurso(idCurso: string) {
    this.servicioTp.tpsObtener().subscribe( 
      (infoTps) => { 
        this.tps  = infoTps
      }
    );
  }

  //  Formularios    - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

  tpCheck(valor?: any) { console.log(valor);  }
  
  alumnoAsigna(idAlumno: any) { 
    console.log('valor => ', idAlumno);
    let tpa: TpAsignacion = { id_tp: null, id_alumno: null, calificacion: null, nota: '8', estado: null}
    this.servicioTpAsigna.tpAGuardar(tpa, null)
  }

}
