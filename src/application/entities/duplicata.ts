import { MaskFields } from "../utils/mask-fields";

export type DuplicataProps = Partial<{
  numero: number;
  vencimento: string;
  valor: number;
}>;

class Duplicata {
  constructor(private props: DuplicataProps) {}

  public get numero() {
    return this.props.numero || "";
  }

  public get vencimento() {
    return MaskFields.maskDate(this.props.vencimento) || "";
  }

  public get valor() {
    return MaskFields.maskNumber(this.props.valor);
  }
}

export { Duplicata };
