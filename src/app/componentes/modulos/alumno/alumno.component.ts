/* 
  Pani
*/

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
//  Modelo
import { Alumno } from 'src/app/modelos/alumno.interface';
//  servicio
import { AlumnoService } from '../alumno.service';
import { Observable } from 'rxjs';


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
  modo= 'Ver';
  titulo = 'Ver';
  //alumnos$: this.servicioAlumno.alumnos;
  //alumnos: Alumno[];
  //alumnos$: any;

  constructor(
    private ruta: ActivatedRoute,
    private servicioAlumno: AlumnoService,
    private fb: FormBuilder,
    private router: Router,
    private location: Location
    ) { 
      //this.alumnos$ = this.servicioAlumno.alumnos;
      //this.formularioIniciar();
    }

  ngOnInit() { this.alumnoObtiene(); }
  
  alumnoObtiene() {
    console.log('alumnoObtiene');
    const id = this.ruta.snapshot.paramMap.get('id');
    console.log(id);
    this.servicioAlumno.alumnoObtenerPorId(id).subscribe(
      (alumno) => {
        this.alumno = alumno.payload.data();
        console.log('alumno => ' + this.alumno.nombre);
        console.log('alumno = ' + JSON.stringify(this.alumno));
        
      }
    );
  }



  //  Crea | Edita    - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

  formularioIniciar() {
    this.formularioAlumno = this.fb.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      dni: [null, [Validators.required]],
      email: ['', [Validators.required]],
      institucion: ['', [Validators.required]],
      curso: ['', [Validators.required]],
      comentarios: ['', [Validators.required]]
    });
    if (typeof this.alumno === 'undefined') {
      // this.router.navigate(['new']);
      this.alumno = { id: null, nombre: null, apellido: null, dni: null, email: null, institucion: null, curso: null}
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

  
  
  /* 
    //  Lista    - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
    
    listadoIniciar() {
      //this.alumnos$ = this.servicioAlumno.alumnos;
      //this.alumnos$ = this.servicioAlumno.alumnosTraer();
      //this.servicioAlumno.alumnosTraer().subscribe(      (infoAlumnos) => {  this.alumnos$ = infoAlumnos;}   );
      this.servicioAlumno.alumnosTraer();
      this.modo = 'LISTAR';
    }
  
    clickCrear() {
      console.log('CREAR => ');
      this.titulo = 'Crear un nuevo alumno';
      this.formularioIniciar();
      this.modo = 'CREAR';
    }
  
    clickEdiar(alumno: Alumno) {
      console.log('EDITAR => ' + JSON.stringify(alumno));
      this.titulo = 'Editar alumno ' + alumno.apellido + ' ' + alumno.nombre;
      this.alumno = alumno;
      this.formularioIniciar();
      this.modo = 'EDITAR';
    }
  
    clickVer(alumno: Alumno) {
      console.log('VER => ' + JSON.stringify(alumno));
      this.alumno = alumno;
      this.formularioIniciar();
      this.modo = 'VER';
    }
    
    clickBorrar(alumnoId: string) {
      console.log('Borrar => ' + alumnoId);
      this.servicioAlumno.alumnoEliminar(alumnoId);
    }
  
   */  
}
