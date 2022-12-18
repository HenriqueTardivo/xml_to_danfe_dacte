import { MaskFields } from "../utils/mask-fields";

export type EnderecoProps = Partial<{
  logradouro: string;
  numero: number;
  complemento: string;
  bairro: string;
  cidade: string;
  cep: string;
  municipio: string;
  uf: string;
  pais: string;
}>;

export class Endereco {
  private props: EnderecoProps;

  constructor(props: EnderecoProps) {
    this.props = props;
  }

  public get logradouro() {
    return this.props.logradouro || "";
  }

  public get numero() {
    const numero = this.props.numero ? "N°" + this.props.numero : "";

    return numero;
  }

  public get complemento() {
    return this.props.complemento || "";
  }

  public get bairro() {
    return this.props.bairro || "";
  }

  public get cidade() {
    return this.props.cidade || "";
  }

  public get cep() {
    return MaskFields.maskCEP(this.props.cep || "");
  }

  public get municipio() {
    return this.props.municipio || "";
  }

  public get pais() {
    const pais = this.props.pais ? this.props.pais.toUpperCase() : "";

    return pais;
  }

  public get uf() {
    const uf = this.props.uf ? this.props.uf.toUpperCase() : "";

    return uf;
  }

  public get primeiraLinha() {
    const primeiraLinha = [this.logradouro, this.numero, this.complemento]
      .filter(Boolean)
      .join(" ");

    return primeiraLinha;
  }

  public get segundaLinha() {
    let segundaLinha = "";

    segundaLinha += this.bairro;
    segundaLinha += this.bairro && this.cidade && ", ";
    segundaLinha += this.cidade;
    segundaLinha += segundaLinha && this.uf && "/ ";
    segundaLinha += this.uf;
    segundaLinha += segundaLinha && this.cep && " - ";
    segundaLinha += this.cep;

    return segundaLinha;
  }
}
