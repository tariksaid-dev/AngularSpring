import { Component, OnInit } from '@angular/core';
import { Factura } from './models/factura';
import { ClienteService } from '../clientes/cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable, map, mergeMap } from 'rxjs';
import { FacturaService } from './services/factura.service';
import { Producto } from './models/producto';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ItemFactura } from './models/item-factura';
import swal from 'sweetalert2';

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
})
export class FacturasComponent implements OnInit {
  titulo: string = 'Nueva Factura';
  factura: Factura = new Factura();

  // Autocomplete
  autocompleteControl = new FormControl('');
  productosFiltrados: Observable<Producto[]>;

  constructor(
    private clienteService: ClienteService,
    private activatedRoute: ActivatedRoute,
    private facturaService: FacturaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      let clienteId = +params.get('clienteId');
      this.clienteService
        .getCliente(clienteId)
        .subscribe((cliente) => (this.factura.cliente = cliente));
    });

    this.productosFiltrados = this.autocompleteControl.valueChanges.pipe(
      map((value) => (typeof value === 'string' ? value : null)),
      mergeMap((value) => (value ? this._filter(value) : []))
    );
  }

  private _filter(value: string): Observable<Producto[]> {
    const filterValue = value.toLowerCase();

    return this.facturaService.filtrarProductos(filterValue);
  }

  public mostrarNombre(producto?: Producto): string | undefined {
    return producto ? producto.nombre : undefined;
  }

  public seleccionarProducto(event: MatAutocompleteSelectedEvent): void {
    let producto = event.option.value as Producto;
    console.log(producto);

    if (this.existeItem(producto.id)) {
      this.incrementaCantidad(producto.id);
    } else {
      let nuevoItem = new ItemFactura();
      nuevoItem.producto = producto;
      this.factura.items.push(nuevoItem);
    }

    this.autocompleteControl.setValue('');
    event.option.focus();
    event.option.deselect();
  }

  public actualizarCantidad(id: number, event: any): void {
    let cantidad: number = event.target.value as number;
    if (cantidad == 0) {
      return this.eliminarItemFactura(id);
    }

    this.factura.items = this.factura.items.map((item: ItemFactura) => {
      if (id === item.producto.id) {
        item.cantidad = cantidad;
      }
      return item;
    });
  }

  public existeItem(id: number): boolean {
    let existe = false;
    this.factura.items.forEach((item: ItemFactura) => {
      if (id === item.producto.id) {
        existe = true;
      }
    });
    return existe;
  }

  public incrementaCantidad(id: number): void {
    this.factura.items = this.factura.items.map((item: ItemFactura) => {
      if (id === item.producto.id) {
        ++item.cantidad;
      }
      return item;
    });
  }

  public eliminarItemFactura(id: number): void {
    this.factura.items = this.factura.items.filter((item: ItemFactura) => {
      id !== item.producto.id;
    });
  }

  public create(facturaForm): void {
    console.log(this.factura);

    if (this.factura.items.length == 0) {
      this.autocompleteControl.setErrors({ invalid: true });
    }

    if (facturaForm.form.valid && this.factura.items.length > 0) {
      this.facturaService.create(this.factura).subscribe((factura) => {
        swal(
          this.titulo,
          `Factura ${factura.descripcion} creada con éxito`,
          'success'
        );
        this.router.navigate(['/facturas', factura.id]);
      });
    }
  }
}
