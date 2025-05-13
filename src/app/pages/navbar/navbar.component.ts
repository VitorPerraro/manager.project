import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public isLoggedIn: boolean = false;
  public username: string = '';
  constructor(private router: Router) {}


  ngOnInit(): void {
    this.checkLoginStatus();
    this.getUsername();
  }

  private checkLoginStatus(): void {
    const token = localStorage.getItem('authToken');
    this.isLoggedIn = !!token;
  }

  private getUsername(): void{
    const username = localStorage.getItem('username') ?? '';
    this.username = username;
  }

  public logout(): void {
    localStorage.removeItem('authToken');
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }
}