import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree, CanActivateFn, RouterState, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
 
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) : Observable<boolean> | Promise<boolean> | boolean {

    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return false;
    }

    let role = next.data['role'] as string;
    if(this.authService.hasRole(role)) {
      return true;
    }
    swal('Acceso denegado', `Hola ${this.authService.usuario.username}, no tienes acceso a este recurso`, 'warning');
    this.router.navigate(['/clientes']);
    return false;
  }
  
}