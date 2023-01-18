import { MaskFields } from "../utils/mask-fields";

export type ImpostosProps = Partial<{
  baseDeCalculoIcms: number;
  baseDeCalculoIcmsSt: number;
  baseDeCalculoDoIssqn: number;
  valorDoIcms: number;
  valorDoIcmsUfDest: number;
  valorDoIcmsUfRemet: number;
  valorDoIcmsSt: number;
  valorDoImpostoDeImportacao: number;
  valorDoPis: number;
  valorFcp: number;
  valorTotTrib: number;
  valorTotalDoIpi: number;
  valorTotalDoIssqn: number;
  valorDaCofins: number;
}>;

class Impostos {
  private props: ImpostosProps;

  constructor(props: ImpostosProps) {
    this.props = props;
  }

  public get baseDeCalculoIcms() {
    return MaskFields.maskNumber(this.props.baseDeCalculoIcms || 0);
  }

  public get valorDoIcms() {
    return MaskFields.maskNumber(this.props.valorDoIcms || 0), { simbolo: "" };
  }

  public get baseDeCalculoIcmsSt() {
    return (
      MaskFields.maskNumber(this.props.baseDeCalculoIcmsSt || 0),
      { simbolo: "" }
    );
  }

  public get valorDoIcmsSt() {
    return (
      MaskFields.maskNumber(this.props.valorDoIcmsSt || 0), { simbolo: "" }
    );
  }

  public get valorDoImpostoDeImportacao() {
    return (
      MaskFields.maskNumber(this.props.valorDoImpostoDeImportacao || 0),
      { simbolo: "" }
    );
  }

  public get valorDoPis() {
    return MaskFields.maskNumber(this.props.valorDoPis || 0), { simbolo: "" };
  }

  public get valorTotalDoIpi() {
    return (
      MaskFields.maskNumber(this.props.valorTotalDoIpi || 0), { simbolo: "" }
    );
  }

  public get valorDaCofins() {
    return (
      MaskFields.maskNumber(this.props.valorDaCofins || 0), { simbolo: "" }
    );
  }

  public get baseDeCalculoDoIssqn() {
    return (
      MaskFields.maskNumber(this.props.baseDeCalculoDoIssqn || 0),
      { simbolo: "" }
    );
  }

  public get valorTotalDoIssqn() {
    return (
      MaskFields.maskNumber(this.props.valorTotalDoIssqn || 0), { simbolo: "" }
    );
  }

  public get valorDoIcmsUfDest() {
    return MaskFields.maskNumber(this.props.valorDoIcmsUfDest || 0);
  }

  public get valorDoIcmsUfRemet() {
    return MaskFields.maskNumber(this.props.valorDoIcmsUfRemet || 0);
  }

  public get valorFcp() {
    return MaskFields.maskNumber(this.props.valorFcp || 0);
  }

  public get valorTotTrib() {
    return MaskFields.maskNumber(this.props.valorTotTrib || 0);
  }
}

export { Impostos };
