import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'paginator-nav',
  templateUrl: './paginator.component.html'
})
export class PaginatorComponent implements OnInit {

  @Input() public paginador: any;

  public paginas: number[];

  constructor() {}


  ngOnInit(): void {
    this.paginas = new Array(this.paginador.totalPages).fill(0).map((_valor, indice) => indice +1);
  }



}
