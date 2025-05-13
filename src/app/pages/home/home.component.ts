import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private router: Router) { }

  redirectToExternalSite() {
    const url = 'https://managersystems.com.br/contato/';
    window.open(url, '_blank');
    
  }


}
