import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { Observable, map, catchError, throwError, tap } from 'rxjs';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';
import { Region } from './region';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private urlEndPoint: string = 'http://localhost:8080/api/clientes';

  // Enviamos los headers mediante nuestro interceptor
  // private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  public errores: string[] = [];

  constructor(
    private http: HttpClient,
    private router: Router, 
    // private authService: AuthService
  ) {}

  // private agregarAuthorizationHeader() {
  //   let token = this.authService.token;

  //   if(token != null) {
  //     return this.httpHeaders.append('Authorization', 'Bearer ' + token);
  //   }
  //   return this.httpHeaders;
  // }



  // private isNoAutorizado(e): boolean {
  //   if (e.status == 401) {

  //     if(this.authService.isAuthenticated()) {
  //       this.authService.logout();
  //     }

  //     this.router.navigate(['/login'])
  //     return true;
  //   }

  //   if (e.status == 403) {
  //     swal('Acceso denegado', `Hola ${this.authService.usuario.username} no tienes acceso a este recurso!`, 'warning');
  //     this.router.navigate(['/clientes'])
  //     return true;
  //   }
  //   return false;
  // }

  public getRegiones(): Observable<Region[]> {
    return this.http.get<Region[]>(this.urlEndPoint + '/regiones')
    // .pipe(
    //   catchError(e => {
    //     this.isNoAutorizado(e);
    //     return throwError(() => new Error(e));
    //   })
    // );
  }

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
    return this.http.post(this.urlEndPoint, cliente).pipe(
      map((response: any) => response.cliente as Cliente),
      catchError(e => {

        // if(this.isNoAutorizado(e)) {
        //   return throwError(() => new Error(e));
        // }

        if(e.status == 400) {
          this.errores = e.error.errors as string[];
          console.error("Código del error desde el backend: " + e.status);
          console.error(e.error.errors);
          throw new Error(e);
        }

        // swal(e.error.mensaje, e.error.error, 'error');
        if(e.error.mensaje) {
          console.error(e.error.mensaje);
        }
        return throwError(() => new Error(e));
      })
    );
  }

  public getCliente(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {

        // if(this.isNoAutorizado(e)) {
        //   return throwError(() => new Error(e));
        // }

        if(e.status != 401 && e.error.mensaje) {
          this.router.navigate(['/clientes']);
          console.error(e.error.mensaje);
        }

        this.router.navigate(['/clientes']);
        console.error(e.error.mensaje);
        // swal('Error al editar', e.error.mensaje, 'error');
        return throwError(() => new Error(e));
      })
    );
  }

  public udpate(cliente: Cliente): Observable<Cliente>{
    return this.http.put(`${this.urlEndPoint}/${cliente.id}`, cliente).pipe(
      map((response: any) => response.cliente as Cliente),
      catchError(e => {

        // if(this.isNoAutorizado(e)) {
        //   return throwError(() => new Error(e));
        // }

        if(e.status == 400) {
          this.errores = e.error.errors as string[];
          console.error("Código del error desde el backend: " + e.status);
          console.error(e.error.errors);
          throw new Error(e);
        }

        // swal(e.error.mensaje, e.error.error, 'error');
        if(e.error.mensaje) {
          console.error(e.error.mensaje);
        }
        return throwError(() => new Error(e));
      })
    )
  }

  public delete(id: number): Observable<Cliente> {
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {

        // if(this.isNoAutorizado(e)) {
        //   return throwError(() => new Error(e));
        // }

        if(e.error.mensaje) {
          console.error(e.error.mensaje);
        }
        // swal(e.error.mensaje, e.error.error, 'error');
        return throwError(() => new Error(e));
      })
    )
  }

  public subirFoto(archivo: File, id): Observable<HttpEvent<{}>> {
    let formData = new FormData();
    formData.append("archivo", archivo);
    formData.append("id", id);

    // let httpHeaders = new HttpHeaders(); 
    // let token = this.authService.token;

    // if(token != null) {
    //   httpHeaders = httpHeaders.append('Authorization', 'Bearer ' + token);
    // }

    const req = new HttpRequest('POST', `${this.urlEndPoint}/upload`, formData, {
      reportProgress: true
    })

    return this.http.request(req)
    // .pipe(
    //   catchError(e => {
    //     this.isNoAutorizado(e);
    //     return throwError(() => new Error(e));
    //   })
    // );
  }
}
