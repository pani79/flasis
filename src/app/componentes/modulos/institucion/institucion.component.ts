/* 
  PAni
*/



import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Institucion } from 'src/app/modelos/institucion.interface';

import { InstitucionService } from '../institucion.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-institucion',
  templateUrl: './institucion.component.html',
  styleUrls: ['./institucion.component.css']
})
export class InstitucionComponent implements OnInit {

  
  //instituciones$: this.servicioInstitucion.instituciones;
  //alumnos: Institucion[];
  institucion: Institucion;
  formularioInstitucion: FormGroup;
  instituciones$: any;
  modo= 'LISTAR';
  titulo = 'Listado de instituciones';

  constructor(
    private servicioInstitucion: InstitucionService,
    private fb: FormBuilder,
    private router: Router
    ) { 
      this.instituciones$ = this.servicioInstitucion.instituciones;
      this.formularioIniciar();
    }

  ngOnInit() { }


  //  Lista    - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
  
  listadoIniciar() {
    //this.instituciones$ = this.servicioInstitucion.instituciones;
    //this.instituciones$ = this.servicioInstitucion.institucionesTraer();
    //this.servicioInstitucion.institucionesTraer().subscribe(      (infoAlumnos) => {  this.instituciones$ = infoAlumnos;}   );
    this.servicioInstitucion.institucionesTraer();
    this.modo = 'LISTAR';
  }

  clickCrear() {
    console.log('CREAR => ');
    this.titulo = 'Crear una nuevo institucion';
    this.formularioIniciar();
    this.modo = 'CREAR';
  }

  clickEdiar(institucion: Institucion) {
    console.log('EDITAR => ' + JSON.stringify(institucion));
    this.titulo = 'Editar institucion ' +  institucion.nombre;
    this.institucion = institucion;
    this.formularioIniciar();
    this.modo = 'EDITAR';
  }

  clickVer(institucion: Institucion) {
    console.log('VER => ' + JSON.stringify(institucion));
    this.institucion = institucion;
    this.formularioIniciar();
    this.modo = 'VER';
  }
  
  clickBorrar(institucionId: string) {
    console.log('Borrar => ' + institucionId);
    this.servicioInstitucion.institucionEliminar(institucionId);
  }

  //  Crea | Edita    - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
  
  formularioIniciar() {
    this.formularioInstitucion = this.fb.group({
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      nivel: [null, [Validators.required]]
    });
    if (typeof this.institucion === 'undefined') {
      // this.router.navigate(['new']);
      this.institucion = { id: null, nombre: null, descripcion: null, nivel: null}
    } else {
      console.log('relleno');
      this.formularioInstitucion.patchValue(this.institucion);
    }
  }

  guardar() {
    console.log('Saved', this.formularioInstitucion.value);
    const institucion = this.formularioInstitucion.value;
    const institucionId = this.institucion.id || null;
    /* const institucionId = this.institucion?.id || null; */
    this.servicioInstitucion.institucionGuardar(institucion, institucionId);
     
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
    console.log('modificar', this.formularioInstitucion.value);
    const institucion = this.formularioInstitucion.value;
    const institucionId = this.institucion.id || null;
    //console.log('institucionId', institucionId);
    console.log('institucionId', institucionId);
    /* const institucionId = this.institucion?.id || null; */
    this.servicioInstitucion.institucionGuardar(institucion, institucionId);
     
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
