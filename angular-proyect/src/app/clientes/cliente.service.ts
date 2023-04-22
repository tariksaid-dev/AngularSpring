import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { Observable, of, map, catchError, throwError, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private urlEndPoint: string = 'http://localhost:8080/api/clientes';

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  public errores: string[] = [];

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  public getErrores(): string[] {
    return this.errores;
  }

  public getClientes(page: number): Observable<any> {
    // return of(CLIENTES); Cuando queremos trabajar con data local
    // return this.http.get<Cliente[]>(this.urlEndPoint); Forma 1, está bien, hacemos un casting con la clase que queremos que convierta los datos
    return this.http.get(this.urlEndPoint + '/page/' + page).pipe(
      tap((response: any) => {
        console.log('ClienteService: tap 1');
        (response.content as Cliente[]).forEach(cliente => {
          console.log(cliente.nombre);
        })
      }),
      // forma 2, usando map, se hace un casting de la misma forma
      map((response: any) => {
        (response.content as Cliente[]).map(cliente => {
          cliente.nombre = cliente.nombre.toUpperCase();
          return cliente;
        });
        return response;
      }),
      tap(response => {
        console.log("ClienteService: tap 2");
        (response.content as Cliente[]).forEach(cliente => {
          console.log(cliente.nombre);
        })
      })
    );
  }

  public create(cliente: Cliente) : Observable<Cliente> {
    return this.http.post(this.urlEndPoint, cliente, {headers: this.httpHeaders}).pipe(
      map((response: any) => response.cliente as Cliente),
      catchError(e => {
        if(e.status == 400) {
          this.errores = e.error.errors as string[];
          console.error("Código del error desde el backend: " + e.status);
          console.error(e.error.errors);
          throw new Error(e);
        }

        swal(e.error.mensaje, e.error.error, 'error');
        return throwError(() => new Error(e));
      })
    );
  }

  public getCliente(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/clientes']);
        console.error(e.error.mensaje);
        swal('Error al editar', e.error.mensaje, 'error');
        return throwError(() => new Error(e));
      })
    );
  }

  public udpate(cliente: Cliente): Observable<Cliente>{
    return this.http.put(`${this.urlEndPoint}/${cliente.id}`, cliente, {headers: this.httpHeaders}).pipe(
      map((response: any) => response.cliente as Cliente),
      catchError(e => {
        if(e.status == 400) {
          this.errores = e.error.errors as string[];
          console.error("Código del error desde el backend: " + e.status);
          console.error(e.error.errors);
          throw new Error(e);
        }

        swal(e.error.mensaje, e.error.error, 'error');
        return throwError(() => new Error(e));
      })
    )
  }

  public delete(id: number): Observable<Cliente> {
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        console.error(e.error.mensaje);
        swal(e.error.mensaje, e.error.error, 'error');
        return throwError(() => new Error(e));
      })
    )
  }
}
