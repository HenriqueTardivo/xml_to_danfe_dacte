import { MaskFields } from "../utils/mask-fields";

export type FaturaProps = {
  numero: number;
  formaDePagamento: number;
  valorOriginal: number;
  valorDoDesconto: number;
  valorLiquido: number;
};

class Fatura {
  constructor(private props: FaturaProps) {}

  public get numero() {
    return this.props.numero || "";
  }

  public get valorOriginal() {
    return MaskFields.maskNumber(this.props.valorOriginal || 0);
  }

  public get valorDoDesconto() {
    return MaskFields.maskNumber(this.props.valorDoDesconto || 0);
  }

  public get valorLiquido() {
    return MaskFields.maskNumber(this.props.valorLiquido || 0);
  }

  public get formaDePagamento() {
    return {
      0: "A VISTA",
      1: "A PRAZO",
      2: "OUTROS",
    }[this.props.formaDePagamento];
  }
}

export { Fatura };
