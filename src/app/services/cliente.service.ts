import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environments } from 'src/environments/environments';
import { Tecnico } from '../models/tecnico';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Cliente } from '../models/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private readonly baseUrl: string = environments.baseUrl;

  constructor(private http: HttpClient, private snak: MatSnackBar) { }

  findAll(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.baseUrl}/clientes`);
  }

  findById(id: any): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.baseUrl}/clientes/${id}`);
  }


  create(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(`${this.baseUrl}/clientes`, cliente);
  }

  update(cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.baseUrl}/clientes/${cliente.id}`, cliente);
  }

  delete(id: any): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/clientes/${id}`);
  }

  message(msg: string): void {
    this.snak.open(`${msg}`, 'OK', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 4000
    });
  }
}
