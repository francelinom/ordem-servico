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

  create(tecnico: Tecnico): Observable<Tecnico> {
    return this.http.post<Tecnico>(`${this.baseUrl}/tecnicos`, tecnico);
  }

  message(msg: string): void {
    this.snak.open(`${msg}`, 'OK', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 4000
    });
  }
}
