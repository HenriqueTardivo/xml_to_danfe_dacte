export type VolumesProps = Partial<{
  quantidade: number;
  especie: string;
  marca: string;
  numerecao: string;
  pesoBruto: number;
  pesoLiquido: number;
}>;

class Volumes {
  private props: VolumesProps;

  constructor(props: VolumesProps) {
    this.props = props;
  }

  public get quantidade() {
    return this.props.quantidade || "";
  }
  public get especie() {
    return this.props.especie || "";
  }
  public get marca() {
    return this.props.marca || "";
  }
  public get numerecao() {
    return this.props.numerecao || "";
  }
  public get pesoBruto() {
    return this.props.pesoBruto || "";
  }
  public get pesoLiquido() {
    return this.props.pesoLiquido || "";
  }
}

export { Volumes };
