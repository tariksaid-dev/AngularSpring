import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import swal from 'sweetalert2';
import { tap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
})
export class ClientesComponent implements OnInit {

  public clientes: Cliente[] = [];
  public paginador: any;

  constructor(
    private clienteService: ClienteService,
    private activatedRoute: ActivatedRoute
    ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(
      params => {
        let page: number = +params.get('page');
        
        if(!page) {
          page = 0;
        }

        this.clienteService.getClientes(page).pipe(
          tap(response => {
            console.log("ClientesComponent: tap 3");
            (response.content as Cliente[]).forEach(cliente => console.log(cliente.nombre))
          })).subscribe(
            response => {this.clientes = response.content as Cliente[];
              this.paginador = response;
            });
      }
    )
  }

  delete(cliente: Cliente): void {
    swal({
      title: 'Está seguro?', 
      text: `¿Seguro que desea elminiar al cliente ${cliente.nombre} ${cliente.apellido}?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false,
      reverseButtons: true
    }).then(result => {
      if (result.value) {
        console.log('aa');
        this.clienteService.delete(cliente.id).subscribe(
          response => {
            this.clientes = this.clientes.filter(cli => cli !== cliente)
            swal(
              'Cliente eliminado!',
              `Cliente ${cliente.nombre} eliminado con éxito`,
              'success'
            )
          }
        )
      }
    })
  }
}
