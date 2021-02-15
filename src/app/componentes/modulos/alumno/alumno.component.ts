import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Alumno } from 'src/app/modelos/alumno.interface';

import { AlumnoService } from '../alumno.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.component.html',
  styleUrls: ['./alumno.component.css']
})
export class AlumnoComponent implements OnInit {

  //alumnos$: this.servicioAlumno.alumnos;
  //alumnos: Alumno[];
  alumno: Alumno;
  formularioAlumno: FormGroup;
  alumnos$: any;
  modo= 'LISTAR';

  constructor(
    private servicioAlumno: AlumnoService,
    private fb: FormBuilder,
    private router: Router
    ) { 
      this.alumnos$ = this.servicioAlumno.alumnos;
      this.formularioIniciar();
    }

  ngOnInit() {
    /* 
    if (typeof this.employee === 'undefined') {
      this.router.navigate(['new']);
    } else {
      this.employeeForm.patchValue(this.employee);
    } */
    
    if (typeof this.alumno === 'undefined') {
      // this.router.navigate(['new']);
      this.alumno = { nombre: 'a', apellido: 'B', dni: 0, email: 'dsadasda', curso: null}
    } else {
      this.formularioAlumno.patchValue(this.alumno);
    }
  }

  cambiarDeModo() {
    console.log(this.modo);    
    this.modo = (this.modo === 'EDITAR')? 'LISTAR' : 'EDITAR';
  }


  //  Lista    - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
  
  listadoIniciar() {
    //this.alumnos = this.servicioAlumno.alumnos;
  }

  //  Crea | Edita    - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
  
  formularioIniciar() {
    if (typeof this.alumno === 'undefined') {
      // this.router.navigate(['new']);
      this.alumno = { nombre: 'a', apellido: 'B', dni: 0, email: 'dsadasda', curso: null}
    } else {
      this.formularioAlumno.patchValue(this.alumno);
    }
    this.formularioAlumno = this.fb.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      dni: [null, [Validators.required]],
      email: ['', [Validators.required]],
      curso: ['', [Validators.required]]
    });
  }

  guardar() {
    
    console.log('Saved', this.formularioAlumno.value);
    const alumno = this.formularioAlumno.value;
    const alumnoId = null;
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
