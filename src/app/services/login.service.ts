import { Injectable } from '@angular/core';
import { RequestLogin } from '../resources/RequestLogin';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseLogin } from '../resources/ResponseLogin';
import { enviroment } from '../../enviroments/enviroment';


@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private httpClient: HttpClient) {}

  private authUrl = `${enviroment.baseUrl}/usuario/autenticar`;

  public doLogin(requestLogin: RequestLogin): Observable<ResponseLogin> { 
    const params = new HttpParams()
      .set('login', requestLogin.login)
      .set('senha', requestLogin.password);

    return this.httpClient.post<ResponseLogin>(this.authUrl, null, { params });
  }
}
