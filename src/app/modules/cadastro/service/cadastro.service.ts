import { Injectable } from '@angular/core';
import { Pessoa } from '../models/pessoa';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {

  private readonly baseUrl = 'http://localhost:3000';

  constructor(
    private readonly http: HttpClient
  ) { }

  public cadastraPessoa(pessoa: Pessoa): Observable<Pessoa> { 
    return this.http.post<Pessoa>(`${this.baseUrl}/pessoas`, pessoa);
  }

  public getPessoaPorId(id: number): Observable<Pessoa> { 
    return this.http.get<Pessoa>(`${this.baseUrl}/pessoas/${id}`);
  }

  public editarPessoa(id: number, pessoa: Pessoa): Observable<Pessoa> {
    return this.http.put<Pessoa>(`${this.baseUrl}/pessoas/${id}`, pessoa);
  }
}
