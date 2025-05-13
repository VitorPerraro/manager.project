import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Country } from '../pages/dashboard/country.model';
import { enviroment } from '../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
 
    constructor(private http: HttpClient) { }
    private apiUrl = `${enviroment.baseUrl}/pais`;

  getCountries(): Observable<Country[]> {
    const token = localStorage.getItem('authToken')
    const params = new HttpParams()
    .set('token', token!)
    return this.http.get<Country[]>(`${this.apiUrl}/listar`, {params});
  }

  saveCountry(country: Country): Observable<Country> {
    const token = localStorage.getItem('authToken')
    const params = new HttpParams()
    .set('token', token!)
    return this.http.post<Country>(`${this.apiUrl}/salvar`, country, {params});
  }

  deleteCountry(country: Country): Observable<void> {
    const token = localStorage.getItem('authToken')
    const params = new HttpParams()
    .set('id', country.id)
    .set('token', token!)
    return this.http.get<void>(`${this.apiUrl}/excluir`, {params});
  }

  renewToken(): Observable<boolean>{
    const token = localStorage.getItem('authToken')
    const params = new HttpParams() 
    .set('token', token!)
    return this.http.get<boolean>(`${enviroment.baseUrl}/usuario/renovar-ticket`, {params})
  }
}