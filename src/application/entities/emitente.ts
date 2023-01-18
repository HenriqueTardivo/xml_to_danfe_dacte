import { makePessoaProps } from "./factories/pessoa-factorie";
import { Pessoa, PessoaProps } from "./pessoa";

export type EmitenteProps = Partial<{
  logotipo: string;
  InscricaoMunicipal: number;
}> &
  PessoaProps;

class Emitente extends Pessoa {
  private emitenteProps: EmitenteProps;

  constructor(props: EmitenteProps) {
    super(makePessoaProps(props));
    this.emitenteProps = props;
  }

  public get logotipo() {
    return this.emitenteProps.logotipo || "";
  }

  public get InscricaoMunicipal() {
    return this.emitenteProps.InscricaoMunicipal || "";
  }
}

export { Emitente };
