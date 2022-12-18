import { IinfQitem } from "../interfaces/ICte";
import { MaskFields } from "../utils/mask-fields";

export interface DacteProps {
  tpCte: number;
  tpServ: number;
  toma: string;
  modalFrete: string;
  cfopFrete: string;
  inicioPrestacao: string;
  finalPrestacao: string;
  modelo: string;
  prodPred: string;
  carga: string;
  observacao: string;
  rntrc: string;
  ciot: string;
  dataEntrega: string;
  componenteServico: string;
  outrasCaracCarga: string;
}

class Dacte {
  private props: DacteProps;
  private _medidas: IinfQitem[] | IinfQitem;
  private _cubagem: string[] | string;
  private _volume: string[] | string;

  constructor(props: DacteProps) {
    this.props = props;
  }

  public get tpCte() {
    return (
      {
        0: "Normal",
        1: "Complemento",
        2: "Anulação",
        3: "Substituto",
      }[this.props.tpCte] || ""
    );
  }

  public get tpServ() {
    return (
      {
        0: "Normal",
        1: "Subcontratação",
        2: "Redespacho",
        3: "Redespacho Intermediário",
        4: "Multimodal",
      }[this.props.tpServ] || ""
    );
  }

  public get toma() {
    return (
      {
        0: "Remetente",
        1: "Expeditor",
        2: "Recebedor",
        3: "Destinatario",
      }[this.props.toma] || ""
    );
  }

  public get modalFrete() {
    return this.props.modalFrete;
  }

  public get cfopFrete() {
    return this.props.cfopFrete;
  }

  public get inicioPrestacao() {
    return this.props.inicioPrestacao;
  }

  public get finalPrestacao() {
    return this.props.finalPrestacao;
  }

  public get modelo() {
    return this.props.modelo;
  }

  public get prodPred() {
    const prod_pred = this.props.prodPred;

    if (prod_pred) return prod_pred.toUpperCase();

    return "";
  }

  public returnUniMed(codUniMed: string) {
    return (
      {
        "00": "M3",
        "01": "KG",
        "02": "TON",
        "03": "UN",
        "04": "L",
        "05": "MMBTU",
      }[codUniMed] || ""
    );
  }

  public set carga(carga: IinfQitem[] | IinfQitem) {
    if (!carga) return;

    const isArray = Array.isArray(carga);

    if (isArray) {
      const cubagem = carga.find(
        (item) => item.tpMed._text === "M3" || "PESO CUBADO"
      );

      const volume = carga.find((item) => item.tpMed._text === "VOLUMES");

      const medidas = carga.filter(
        (item) => !["M3", "VOLUMES", "PESO CUBADO"].includes(item.tpMed._text)
      );

      if (cubagem) {
        this._cubagem =
          cubagem.qCarga._text + " / " + this.returnUniMed(cubagem.cUnid._text);
      }

      if (volume) {
        this._volume =
          volume.qCarga._text + " / " + this.returnUniMed(volume.cUnid._text);
      }

      if (medidas.length > 0) {
        this._medidas = medidas;
      }

      return;
    }

    switch (carga.tpMed._text) {
      case "VOLUMES":
        this._volume =
          carga.qCarga._text + " / " + this.returnUniMed(carga.cUnid._text);
        break;
      case "M3" || "PESO CUBADO":
        this._cubagem =
          carga.qCarga._text + " " + this.returnUniMed(carga.cUnid._text);
        break;
      default:
        this._medidas = carga;
    }

    return;
  }

  public get medidas() {
    return this._medidas;
  }

  public get volumes() {
    return this._volume;
  }

  public get cubagem() {
    return this._cubagem;
  }

  public get observacao() {
    return this.props.observacao;
  }

  public get rntrc() {
    return this.props.rntrc;
  }

  public get ciot() {
    return this.props.ciot;
  }

  public get dataEntrega() {
    return MaskFields.maskDate(this.props.dataEntrega);
  }

  public get componenteServico() {
    return this.props.componenteServico;
  }

  public get outrasCaracCarga() {
    return this.props.outrasCaracCarga;
  }
}

export { Dacte };
