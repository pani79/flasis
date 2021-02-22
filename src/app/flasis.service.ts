import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FlasisService {

  constructor(private router: Router) { }

  navegarA(url: string) {  this.router.navigateByUrl(url); }
}
