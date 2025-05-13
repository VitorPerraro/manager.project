import { Component, OnInit } from '@angular/core';
import { RequestLogin } from '../../resources/RequestLogin';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { ResponseLogin } from '../../resources/ResponseLogin';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  public requestLogin: RequestLogin = new RequestLogin();

  constructor(
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.requestLogin = new RequestLogin();
  }

  public doLogin(): void {
    this.loginService.doLogin(this.requestLogin).subscribe(
      (data: ResponseLogin) => {
        if (data && data.token) {
          if (typeof localStorage !== 'undefined') {
            localStorage.setItem('authToken', data.token);
            localStorage.setItem('admin', data.administrador);
            localStorage.setItem('username', data.nome)
            this.router.navigate(['/home']);
          } else {
            console.error('localStorage is not available');
          }
        } else {
          console.error('Login failed: Invalid data');
        }
      },
      (error) => {
        console.error('Error in request', error);
      }
    );
  }}