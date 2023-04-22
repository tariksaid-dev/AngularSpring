import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  public cliente: Cliente = new Cliente();
  public titulo: string = "Crear Cliente";
  public errores: string[] = [];

  constructor (
    private clienteService: ClienteService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {};

  public ngOnInit(): void {
      this.cargarCliente();
  }

  public cargarCliente(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      if(id) {
        this.clienteService.getCliente(id).subscribe(
          cliente => this.cliente = cliente
      )};
    })
  };

  public create(): void {
    this.clienteService.create(this.cliente)
    .subscribe({
      next: (c) => {
        swal('Nuevo cliente', `El cliente ${c.nombre} ha sido creado con éxito!`, 'success')
      },
      error: (err) => {
        this.errores = this.clienteService.getErrores();
      }, 
      complete: () => {
        console.log("Completed");
        this.router.navigate(['/clientes']);
      }
    })
  };

  public update(): void {
    this.clienteService.udpate(this.cliente)
    .subscribe({
      next: (c) => {
        swal('Cliente actualizado', `El cliente ${c.nombre} ha sido actualizado con éxito!`, 'success')
      },
      error: (err) => {
        this.errores = this.clienteService.getErrores();
      },
      complete: () => {
        console.log("Completed");
        this.router.navigate(['/clientes']);
      }
    });
  }
}
