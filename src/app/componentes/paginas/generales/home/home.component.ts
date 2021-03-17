/* 
  Pani
*/

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'flasis-c-p-generales-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  menu = [
    {
      titulo: 'Instituciones',
      link: '/instituciones',
      icono: 'festival'
    },{
      titulo: 'Cursos',
      link: '/cursos',
      icono: 'recent_actors'
    },{
      titulo: 'Alumnos',
      link: '/alumnos',
      icono: 'account_circle'
    },{
      titulo: 'Trabajos practicos',
      link: '/trabajospracticos',
      icono: 'assignment'
    },{
      titulo: 'Asignacion de TPs',
      link: '/trabajospracticos/asignacion',
      icono: 'assignment_return'
    }
  ]

  //school search_off


  constructor(private router: Router) { }

  ngOnInit() { }

  irA(ruta: string) { this.router.navigateByUrl(ruta)}

}
