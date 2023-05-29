import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environments } from 'src/environments/environments';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OS } from '../models/os';

@Injectable({
  providedIn: 'root'
})
export class OsService {

  private readonly baseUrl: string = environments.baseUrl;

  constructor(private http: HttpClient, private snak: MatSnackBar) { }

  findAll(): Observable<OS[]> {
    return this.http.get<OS[]>(`${this.baseUrl}/os`);
  }

  findById(id: any): Observable<OS> {
    return this.http.get<OS>(`${this.baseUrl}/os/${id}`);
  }


  create(os: OS): Observable<OS> {
    return this.http.post<OS>(`${this.baseUrl}/os`, os);
  }

  update(os: OS): Observable<OS> {
    return this.http.put<OS>(`${this.baseUrl}/os/${os.id}`, os);
  }

  delete(id: any): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/os/${id}`);
  }

  message(msg: string): void {
    this.snak.open(`${msg}`, 'OK', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 4000
    });
  }
}
