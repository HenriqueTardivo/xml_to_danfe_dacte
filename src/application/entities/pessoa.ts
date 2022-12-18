import { Endereco } from "./endereco";
import { MaskFields } from "../utils/mask-fields";

export type PessoaProps = Partial<{
  nome: string;
  registroNacional: string;
  endereco: Endereco;
  inscricaoEstadual: string | "";
  telefone: string | "";
  email: string;
}>;

class Pessoa {
  private props: PessoaProps;

  constructor(props: PessoaProps) {
    this.props = props;
  }

  public get nome() {
    return this.props.nome || "";
  }

  public get inscricaoEstadual() {
    return MaskFields.maskIE(this.props.inscricaoEstadual || "");
  }

  public get registroNacional() {
    return MaskFields.maskCnpj(this.props.registroNacional || "");
  }

  public get endereco() {
    return this.props.endereco;
  }

  public get telefone() {
    return this.props.telefone || "";
  }

  public get email() {
    return this.props.email || "";
  }
}

export { Pessoa };
