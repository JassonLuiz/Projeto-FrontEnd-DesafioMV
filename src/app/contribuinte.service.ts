import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Contribuinte } from './contribuinte/contribuinte'

import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContribuinteService {

  url: string = environment.apiBaseUrl;

  constructor(
    private http: HttpClient
  ) { }


  salvar(contribuinte: Contribuinte) : Observable<Contribuinte>{
      return this.http.post<Contribuinte>(this.url, contribuinte);
  }

  listar() : Observable<Contribuinte[]>{
    return this.http.get<any>(this.url);
  }

  deletar(id: number) : Observable<any>{
    return this.http.delete<any>(`${this.url}/${id}`);
  }

  atualizar(contribuinte: Contribuinte) : Observable<any>{
    return this.http.put<Contribuinte>(`${this.url}/${contribuinte.id}`, contribuinte);
  }
}
