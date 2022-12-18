import { Pessoa } from "./pessoa";
import { makePessoaProps } from "./factories/pessoa-factorie";
import { PessoaProps } from "./pessoa";

export type TransportadorProps = Partial<{
  codigoAntt: string;
  placaDoVeiculo: string;
  ufDaPlacaDoVeiculo: string;
}> &
  PessoaProps;

class Transportador extends Pessoa {
  private transportadorProps: TransportadorProps;

  constructor(props: TransportadorProps) {
    super(makePessoaProps(props));
    this.transportadorProps = props;
  }

  public get codigoAntt() {
    return this.transportadorProps.codigoAntt || "";
  }
  public get placaDoVeiculo() {
    return this.transportadorProps.placaDoVeiculo || "";
  }
  public get ufDaPlacaDoVeiculo() {
    return this.transportadorProps.ufDaPlacaDoVeiculo || "";
  }
}

export { Transportador };
