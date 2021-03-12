/* 
  PAni
*/



import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
//  Modelo
import { Curso } from 'src/app/modelos/curso.interface';
import { Institucion } from 'src/app/modelos/institucion.interface';
//  Servicios
import { FlasisService } from 'src/app/flasis.service';
import { CursoService } from '../curso.service';
import { InstitucionService } from '../institucion.service';
//  Datos
import { CURSO_TIPOS } from 'src/app/informacion/datos';
import { JsonpClientBackend } from '@angular/common/http';



@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css']
})
export class CursoComponent implements OnInit {

  curso: any;
  formularioCurso: FormGroup;
  modo: string;
  titulo = 'Listado de cursos';
  instituciones: Institucion[]=[];
  tipoCursos: {};
  cargaInfo = {
    cargando: true,
    titulo: 'Cargando',
    detalle: 'Cargando metadatos en proceso.'
  }
  infoPagina =  {titulo: 'Batman', info: 'BW'}
  debug = true // DEBUG

  @Input() inputInfo: {};


  constructor(
    private servicioFasis:FlasisService,
    private servicioCurso: CursoService,
    private servicioInstitucion: InstitucionService,
    private fb: FormBuilder,
    private ruta: ActivatedRoute,
    private router: Router,
    private location: Location
    ) { 
      this.tipoCursos = CURSO_TIPOS;
    }

  ngOnInit() {
    console.log('input > ' + JSON.stringify(this.inputInfo));
    console.log(this.inputInfo);
    console.log(this.inputInfo == undefined);
    /* 
      cargaInfo = {
        cargando: true,
        titulo: 'Cargando',
        detalle: 'Cargando metadatos en proceso.'
      }
    */
    this.formularioIniciar();
    this.cargaInfo.titulo = 'Preparando'; 
    if(this.inputInfo == undefined) {   
      console.log('no hay inputInfo');         
      const id = this.ruta.snapshot.paramMap.get('id');
      console.log(id);
      if(id !== '') {        
        this.modo = 'EDITAR';
        // curso desde institucion nueva
        this.cursoObtiene(id)
      } else {  
        this.modo = 'CREAR';
        this.infoObtieneInstituciones()
        // curso desde institucion nueva
        this.infoPagina =  {titulo: ('Crear un curso nuevo en la ins NUEVA'), info: 'Dale, rellena al chango.'}
        console.log('CREO NUEVO CURSO <= '); 
      }
        
        /* 
        // NO esta cargado a traves de el componente INSTITUCION
        console.log('e UNDEFINED'); 
        this.infoObtieneInstituciones();
        //this.cargaInfo.cargando = false;
        this.infoPagina =  {titulo: 'Crear un curso nuevo', info: 'Dale, rellena al chango.'}
        */
    }else {
      console.log('hay inputInfo');
      this.infoPagina =  {titulo: ('Crear un curso nuevo en la ins ' + this.inputInfo['institucion']['nombre']), info: 'Dale, rellena al chango.'}
      this.cargaInfo.cargando = false;
      this.modo = 'CREAR';
      this.instituciones.push(this.inputInfo['institucion'])
      this.formularioSetInstitucion(this.inputInfo['institucion']['nombre'], this.inputInfo['institucion']['id'], true)
      /* 
          this.curso.institucion_id = this.inputInfo['institucion']['id'];
          this.curso.institucion_nombre = this.inputInfo['institucion']['nombre'];
          this.formularioCurso.get('institucion').setValue(this.inputInfo['institucion']['id'])
          this.formularioCurso.controls['institucion'].disable() 
      */
    } 
  }
  
  infoObtieneInstituciones() {
    this.cargaInfo = {      cargando: true, titulo: 'Cargando instituciones', detalle: 'En proceso.'    }
    this.servicioInstitucion.institucionesObtener().subscribe(
      infoInstituciones => {
        this.instituciones = infoInstituciones;
        this.cargaInfo['cargando'] = false; 
      }
    );
  }

  infoObtieneInstitucion(id: string) {
    this.servicioInstitucion.institucionObtenerPorId(id).subscribe(
      (institucion) => {
        this.instituciones = [];
        this.instituciones.push(institucion.payload.data() as Institucion)
        //this.formularioCurso.controls['institucion'].setValue(institucion.payload.data()['nombre'])
        console.log('pload ' + institucion.payload.data()['nombre']);
        
        this.formularioCurso.get('institucion').setValue(institucion.payload.data()['id'])
        this.formularioCurso.controls['institucion'].disable()
        this.cargaInfo.cargando = false;
      }
    );
  }

  cursoObtiene(id: string) {
    console.log('cursoObtiene');
    console.log(id);
    if(id !== '') {
      this.servicioCurso.cursoObtenerPorId(id).subscribe(
        (curso) => {
          this.curso = curso.payload.data() as Curso;
          console.log('curso => ' + this.curso.nombre);
          console.log('curso = ' + JSON.stringify(this.curso));
          this.infoPagina =  {titulo: 'Editar curso', info: 'Aca champion vas a poder editar al chango.'}
          this.cargaInfo.cargando = false;
        }
      );
    } else if(id === '') {
      this.cargaInfo.cargando = false;
      this.infoPagina =  {titulo: 'Crear un curso nuevo', info: 'Dale, rellena al chango.'}
      this.modo = 'CREAR';
    } else {  console.log('UOPPPS <= '); }
  }

  
  clickIrAlListado() {    this.servicioFasis.navegarA('cursos'); }
  
  formularioClickOpcion (elemento: string, valor: any) {
    console.log('formularioClickOpcion ', elemento, valor);
    if(elemento === 'ESTABLECIMIENTO') {
      this.formularioSetInstitucion(valor['nombre'], valor['id'], false)
    }else if(elemento === 'TIPO_CURSO') {
      this.curso.tipo_curso = valor;
    }else {
      console.log('UOPS en formularioClickOpcion');
    }
  }

  
  formularioSetInstitucion (institucionNombre: string, institucionID: string, desactiva: boolean) {
    console.log('formularioSetInstitucion', institucionNombre, institucionID, desactiva);
    this.curso.institucion_id = institucionID;
    this.curso.institucion_nombre = institucionNombre;
    this.formularioCurso.get('institucion').setValue(institucionID)
    if(desactiva === true) this.formularioCurso.controls['institucion'].disable()    
  }
  

  //  Crea | Edita    - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
  
  formularioIniciar() {
    this.formularioCurso = this.fb.group({
      institucion: ['', [Validators.required]],
      tipo_curso: [''],
      nombre: ['', [Validators.required]],
      nivel: [null, [Validators.required]],
      division: [null]
    });
    if (typeof this.curso === 'undefined') {
      // this.router.navigate(['new']);
      this.curso = { nombre: null, institucion_id: null, institucion_nombre: null, tipo_curso: null, nivel: null, division: null }
    } else {
      console.log('relleno');
      this.formularioCurso.patchValue(this.curso);
    }
  }

  guardar() {
    console.log('MODO '  + this.modo + ' > ' +  JSON.stringify(this.formularioCurso.value));
    //const curso = this.formularioCurso.value;
    this.curso.tipo_curso = this.formularioCurso.get('tipo_curso').value;
    this.curso.nombre = this.formularioCurso.get('nombre').value;
    this.curso.nivel = this.formularioCurso.get('nivel').value;
    this.curso.division = this.formularioCurso.get('division').value;
    const curso = this.curso;
    const cursoId = this.curso.id || null;
    console.log('guardar ', cursoId, JSON.stringify(curso));
    let resultado =this.servicioCurso.cursoGuardar(curso, cursoId)
      .then(
        (res) => {
          console.log(res)
          curso.id = res
        }
      );
  }
  /* 
  modificar() {
    console.log('MODO '  + this.modo);
    console.log('modificar', this.formularioCurso.value);
    const curso = this.formularioCurso.value;
    const cursoId = this.curso.id || null;
    //console.log('cursoId', cursoId);
    console.log('cursoId', cursoId);
    //const cursoId = this.curso?.id || null;
    this.servicioCurso.cursoGuardar(curso, cursoId);
  }
 */

}
