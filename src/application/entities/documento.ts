import { Duplicata, Fatura } from "application/entities";
import { Recebedor } from "./recebedor";
import { Expeditor } from "./expeditor";
import { Destinatario } from "./destinatario";
import { Emitente } from "./emitente";
import { Transportador } from "./transportador";
import { Protocolo } from "./protocolo";
import { Impostos } from "./imposto";
import { Volumes } from "./volumes";
import { Dacte } from "./dacte";
import { ItemDanfe } from "./item-danfe";
import { Danfe } from "./danfe";

export interface DocumentoProps {
  emitente: Emitente;
  destinatario: Destinatario;
  transportador: Transportador;
  protocolo: Protocolo;
  impostos: Impostos;
  volumes: Volumes;
  danfe: Danfe;
  duplicata?: Duplicata[];
  expeditor?: Expeditor;
  recebedor?: Recebedor;
  dacte?: Dacte;
  fatura?: Fatura;
}

class Documento {
  private props: DocumentoProps;
  private _danfeItems: ItemDanfe[];
  public orientacao = "retrato";

  constructor(props: DocumentoProps) {
    this.props = props;
  }

  public addItem(item: ItemDanfe) {
    this._danfeItems.push(item);
  }

  public get danfeItems() {
    return this._danfeItems;
  }

  public get emitente() {
    return this.props.emitente;
  }

  public get destinatario() {
    return this.props.destinatario;
  }

  public get transportador() {
    return this.props.transportador;
  }

  public get protocolo() {
    return this.props.protocolo;
  }

  public get impostos() {
    return this.props.impostos;
  }

  public get volumes() {
    return this.props.volumes;
  }

  public get duplicatas() {
    return this.props.duplicata;
  }

  public get expeditor() {
    return this.props.expeditor;
  }

  public get recebedor() {
    return this.props.recebedor;
  }

  public get fatura() {
    return this.props.fatura;
  }

  public get dacte() {
    return this.props.dacte;
  }

  public get danfe() {
    return this.props.danfe;
  }
}

export { Documento };
