import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environments } from 'src/environments/environments';
import { Tecnico } from '../models/tecnico';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class TecnicoService {

  private readonly baseUrl: string = environments.baseUrl;

  constructor(private http: HttpClient, private snak: MatSnackBar) { }

  findAll(): Observable<Tecnico[]> {
    return this.http.get<Tecnico[]>(`${this.baseUrl}/tecnicos`);
  }

  findById(id: any): Observable<Tecnico> {
    return this.http.get<Tecnico>(`${this.baseUrl}/tecnicos/${id}`);
  }


  create(tecnico: Tecnico): Observable<Tecnico> {
    return this.http.post<Tecnico>(`${this.baseUrl}/tecnicos`, tecnico);
  }

  update(tecnico: Tecnico): Observable<Tecnico> {
    return this.http.put<Tecnico>(`${this.baseUrl}/tecnicos/${tecnico.id}`, tecnico);
  }

  delete(id: any): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/tecnicos/${id}`);
  }

  message(msg: string): void {
    this.snak.open(`${msg}`, 'OK', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 4000
    });
  }
}
