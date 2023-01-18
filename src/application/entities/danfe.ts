import { MaskFields } from "../utils/mask-fields";

export interface DanfeProps {
  informacoesComplementares: string;
  valorTotalDaNota: number;
  valorTotalDosProdutos: number;
  valorTotalDosServicos: number;
  inscricaoEstadualDoSubstitutoTributario?: string;
  valorDoFrete: number;
  valorDoSeguro: number;
  desconto: number;
  outrasDespesas: number;
  tipo: string;
  numero: string;
  serie: string;
  chaveDeAcesso: string;
  dataDaEmissao: string;
  horarioEntradaSaida?: string;
  dataDaEntradaOuSaida?: string;
  modalidadeDoFrete: string;
  naturezaDaOperacao: string;
}

class Danfe {
  private props: DanfeProps;

  constructor(props: DanfeProps) {
    const numero = parseInt(props.numero, 10);

    if (isNaN(numero)) {
      throw new Error("Não é um número válido. Valor encontrado: " + numero);
    }

    if (numero < 1 || numero > 999999999) {
      throw new Error("O número deve ser um valor entre 1 e 999.999.999");
    }

    this.props = props;
  }

  public get informacoesComplementares() {
    return this.props.informacoesComplementares || "";
  }

  public get valorTotalDaNota() {
    return MaskFields.maskNumber(this.props.valorTotalDaNota || "");
  }

  public get valorTotalDosProdutos() {
    return MaskFields.maskNumber(this.props.valorTotalDosProdutos || "");
  }

  public get valorTotalDosServicos() {
    return MaskFields.maskNumber(this.props.valorTotalDosServicos || "");
  }

  public get valorDoFrete() {
    return MaskFields.maskNumber(this.props.valorDoFrete || "");
  }

  public get valorDoSeguro() {
    return MaskFields.maskNumber(this.props.valorDoSeguro || "");
  }

  public get desconto() {
    return MaskFields.maskNumber(this.props.desconto || "");
  }

  public get outrasDespesas() {
    return MaskFields.maskNumber(this.props.outrasDespesas || "");
  }

  public get tipo() {
    return this.props.tipo || "";
  }

  public get naturezaDaOperacao() {
    return this.props.naturezaDaOperacao || "";
  }

  public get numero() {
    return "N°. " + this.props.numero;
  }

  public get serie() {
    return "SÉRIE " + this.props.serie;
  }

  public get chaveDeAcesso() {
    return "SÉRIE " + this.props.chaveDeAcesso;
  }

  public get dataDaEmissao() {
    return MaskFields.maskDate(this.props.dataDaEmissao);
  }

  public get horarioEntradaSaida() {
    return MaskFields.maskTime(this.props.horarioEntradaSaida);
  }

  public get modalidadeDoFrete() {
    return (
      {
        9: "(9) Sem Frete",
        0: "(0) Emitente",
        1: "(1) Dest/Rem",
        2: "(2) Terceiros",
        3: "(3) T.Próp Rem",
        4: "(4) T.Próp Dest",
      }[this.props.modalidadeDoFrete] || ""
    );
  }

  public get inscricaoEstadualDoSubstitutoTributario() {
    return MaskFields.maskNumber(
      this.props.inscricaoEstadualDoSubstitutoTributario || ""
    );
  }
}

export { Danfe };
