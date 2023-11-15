import { Component } from '@angular/core';
import { AuthService } from '../usuarios/auth.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  public title: string = 'Angular - Spring';

  constructor(public authService: AuthService, public router: Router) {}

  public logout(): void {
    let username = this.authService.usuario.username;

    this.authService.logout();

    swal(
      'Logout',
      `Hola ${username}, has cerrado sesión con éxito!`,
      'success'
    );

    this.router.navigate(['/login']);
  }
}
