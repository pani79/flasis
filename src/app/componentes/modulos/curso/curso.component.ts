/* 
  PAni
*/



import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Curso } from 'src/app/modelos/curso.interface';

import { CursoService } from '../curso.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css']
})
export class CursoComponent implements OnInit {

  
  curso: Curso;
  formularioCurso: FormGroup;
  cursos$: any;
  modo= 'LISTAR';
  titulo = 'Listado de cursoes';


  constructor(
    private servicioCurso: CursoService,
    private fb: FormBuilder,
    private router: Router
    ) { 
      this.cursos$ = this.servicioCurso.cursos;
      this.formularioIniciar();
    }

  ngOnInit() { }


  //  Lista    - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
  
  listadoIniciar() {
    //this.cursos$ = this.servicioCurso.cursos;
    //this.cursos$ = this.servicioCurso.cursosTraer();
    //this.servicioCurso.cursosTraer().subscribe(      (infoAlumnos) => {  this.cursos$ = infoAlumnos;}   );
    this.servicioCurso.cursosTraer();
    this.modo = 'LISTAR';
  }

  clickCrear() {
    console.log('CREAR => ');
    this.titulo = 'Crear una nuevo curso';
    this.formularioIniciar();
    this.modo = 'CREAR';
  }

  clickEdiar(curso: Curso) {
    console.log('EDITAR => ' + JSON.stringify(curso));
    this.titulo = 'Editar curso ' +  curso.nombre;
    this.curso = curso;
    this.formularioIniciar();
    this.modo = 'EDITAR';
  }

  clickVer(curso: Curso) {
    console.log('VER => ' + JSON.stringify(curso));
    this.curso = curso;
    this.formularioIniciar();
    this.modo = 'VER';
  }
  
  clickBorrar(cursoId: string) {
    console.log('Borrar => ' + cursoId);
    this.servicioCurso.cursoEliminar(cursoId);
  }

  //  Crea | Edita    - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
  
  formularioIniciar() {
    this.formularioCurso = this.fb.group({
      nombre: ['', [Validators.required]],
      institucion: ['', [Validators.required]],
      nivel: [null, [Validators.required]]
    });
    if (typeof this.curso === 'undefined') {
      // this.router.navigate(['new']);
      this.curso = { id: null, nombre: null, institucion: null, nivel: null}
    } else {
      console.log('relleno');
      this.formularioCurso.patchValue(this.curso);
    }
  }

  guardar() {
    console.log('Saved', this.formularioCurso.value);
    const curso = this.formularioCurso.value;
    const cursoId = this.curso.id || null;
    /* const cursoId = this.curso?.id || null; */
    this.servicioCurso.cursoGuardar(curso, cursoId);
     
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
    console.log('modificar', this.formularioCurso.value);
    const curso = this.formularioCurso.value;
    const cursoId = this.curso.id || null;
    //console.log('cursoId', cursoId);
    console.log('cursoId', cursoId);
    /* const cursoId = this.curso?.id || null; */
    this.servicioCurso.cursoGuardar(curso, cursoId);
     
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
