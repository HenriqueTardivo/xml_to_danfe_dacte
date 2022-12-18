import { MaskFields } from "../utils/mask-fields";

export type ItemDanfeProps = {
  codigo?: string;
  descricao?: string;
  ncmSh?: string;
  ocst?: string;
  cfop?: string;
  unidade?: string;
  quantidade: number;
  valorUnitario?: number;
  valorTotal: number;
  baseDeCalculoIcms?: number;
  valorDoIcms?: number;
  valorDoIpi: number;
  aliquotaDoIcms?: number;
  aliquotaDoIpi?: number;
  informacoesAdicionais?: string;
};

class ItemDanfe {
  private props: ItemDanfeProps;

  constructor(props: ItemDanfeProps) {
    if (props.quantidade < 0)
      throw new Error("Quantidade não pode ser inferior a zero");

    if (props.valorTotal < 0)
      throw new Error("Valor total não pode ser inferior a zero");

    if (props.valorDoIpi < 0)
      throw new Error("Valor total não pode ser inferior a zero");

    this.props = props;
  }

  public get codigo() {
    return this.props.codigo || "";
  }

  public get descricao() {
    return this.props.descricao || "";
  }

  public get informacoesAdicionais() {
    return this.props.informacoesAdicionais || "";
  }

  public get ncmSh() {
    return this.props.ncmSh || "";
  }

  public get ocst() {
    return this.props.ocst || "";
  }

  public get cfop() {
    return this.props.cfop || "";
  }

  public get valorUnitario() {
    return MaskFields.maskNumber(this.props.valorUnitario || 0);
  }

  public get valorTotal() {
    return MaskFields.maskNumber(this.props.valorTotal || 0);
  }

  public get unidade() {
    const unidade = this.props.unidade ? this.props.unidade.toUpperCase() : "";

    return unidade;
  }

  public get baseDeCalculoIcms() {
    return (
      MaskFields.maskNumber(this.props.baseDeCalculoIcms || 0),
      {
        simbolo: "",
      }
    );
  }

  public get valorDoIcms() {
    return (
      MaskFields.maskNumber(this.props.valorDoIcms || 0),
      {
        simbolo: "",
      }
    );
  }

  public get valorDoIpi() {
    return (
      MaskFields.maskNumber(this.props.valorDoIpi || 0),
      {
        simbolo: "",
      }
    );
  }

  public get aliquotaDoIcms() {
    const aliquota = this.props.aliquotaDoIcms
      ? this.props.aliquotaDoIcms + "%"
      : "";

    return aliquota;
  }

  public get aliquotaDoIpi() {
    const aliquota = this.props.aliquotaDoIpi
      ? this.props.aliquotaDoIpi + "%"
      : "";

    return aliquota;
  }
}

export { ItemDanfe };
