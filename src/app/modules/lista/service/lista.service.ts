import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Pessoa } from '../../cadastro/models/pessoa';

@Injectable({
  providedIn: 'root'
})
export class ListaService {

  private readonly baseUrl = 'http://localhost:3000';
  private readonly tabelaBS: BehaviorSubject<Pessoa[]> = new BehaviorSubject<Pessoa[]>([]);

  constructor(
    private readonly http: HttpClient
  ) { }

  public getListaDeUsuarios(): Observable<Pessoa[]> {
    return this.http.get<Pessoa[]>(`${this.baseUrl}/pessoas`);
  }

  public deletePessoa(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/pessoas/${id}`);
  }

  public getTabelaBS(): Observable<Pessoa[]> { 
    return this.tabelaBS;
  }

  public setTabelaBS(pessoas: Pessoa[]): void {
    this.tabelaBS.next(pessoas);
  }
}
