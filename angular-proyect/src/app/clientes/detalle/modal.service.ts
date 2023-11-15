import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  public modal: boolean = false;
  private _notificarUpload = new EventEmitter<any>();

  constructor() {}

  public get notificarUpload(): EventEmitter<any> {
    return this._notificarUpload;
  }

  public abrirModal(): void {
    this.modal = true;
  }

  public cerrarModal(): void {
    this.modal = false;
  }
}
