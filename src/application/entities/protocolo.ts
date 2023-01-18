import { MaskFields } from "../utils/mask-fields";

export type ProtocoloProps = Partial<{
  codigo: string;
  data: string;
}>;

class Protocolo {
  private props: ProtocoloProps;

  constructor(props: ProtocoloProps) {
    this.props = props;
  }

  public get codigo() {
    return this.props.codigo || "";
  }

  public get data() {
    return MaskFields.maskDate(this.props.data || "");
  }

  public get formatacao() {
    let formatacao = "";

    formatacao = this.codigo;
    formatacao += this.codigo && this.data && " - ";
    formatacao += MaskFields.maskDate(this.props.data || "");

    return formatacao;
  }
}

export { Protocolo };
