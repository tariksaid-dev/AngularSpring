import { Cliente } from "src/app/clientes/cliente";
import { ItemFactura } from "./item-factura";

export class Factura {
  public id: number;
  public descripcion: string;
  public observacion: string;
  public items: Array<ItemFactura> = [];
  public cliente: Cliente;
  public total: number;
  public createAt: string;
}
