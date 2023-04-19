import { Component } from '@angular/core';
import { Cliente } from './cliente';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent {

  public cliente: Cliente = new Cliente();
  public titulo: string = "Crear Cliente";

  constructor() {}

  public create(): void {
    console.log("Clicado");
    console.log(this.cliente);
  }
}
