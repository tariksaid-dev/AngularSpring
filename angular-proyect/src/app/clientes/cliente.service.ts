import { Injectable } from '@angular/core';
import { CLIENTES } from './clientes.json';
import { Cliente } from './cliente';
import { Observable, of, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private urlEndPoint: string = 'http://localhost:8080/api/clientes';

  constructor(private http: HttpClient) { }

  getClientes(): Observable<Cliente[]> {
    // return of(CLIENTES); Cuando queremos trabajar con data local
    // return this.http.get<Cliente[]>(this.urlEndPoint); Forma 1, está bien, hacemos un casting con la clase que queremos que convierta los datos
    return this.http.get(this.urlEndPoint).pipe(
      map(response => response as Cliente[])
    );
    // forma 2, usando map, se hace un casting de la misma forma
  }

}
