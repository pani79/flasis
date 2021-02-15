import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'flasis-c-i-pagina-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private ruta: Router) { }

  ngOnInit() {
  }

  navegarA(direccion: string) { 
    console.log('vamos a ' + direccion);
    this.ruta.navigateByUrl(direccion);
  }

}
