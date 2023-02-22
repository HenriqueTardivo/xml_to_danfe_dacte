import { MaskFields } from "../utils/mask-fields";
import { Documento } from "./documento";

export interface FormularioDeSegurancaProps {
  documento: Documento;
  destaqueDeIcmsProprio: string;
  destaqueDeIcmsPorST: string;
  justificativa: string;
  dataDaEntradaEmContingencia: string;
}

class FormularioDeSeguranca {
  constructor(private props: FormularioDeSegurancaProps) {
    if (!props.justificativa || props.justificativa.length < 15) {
      throw new Error(
        [
          "A justificativa para entrada em contingência deve conter",
          "pelo menos 15 caracteres",
        ].join("")
      );
    }
  }

  public get destaqueDeIcmsProprio() {
    return this.props.destaqueDeIcmsProprio;
  }

  public get destaqueDeIcmsPorST() {
    return this.props.destaqueDeIcmsPorST;
  }
  public get justificativa() {
    return this.props.justificativa;
  }
  public get dataDaEntradaEmContingencia() {
    return MaskFields.maskDate(this.props.dataDaEntradaEmContingencia);
  }

  public get dadosDocumento() {
    return {
      uf: this.props?.documento?.emitente?.endereco?.uf,
      tipoDeEmissao: 5,
      cnpj: this.props.documento.emitente.registroNacional,
      valorDoDocumento: this.props.documento.danfe.valorTotalDaNota,
      destaqueDeIcmsProprio: this.destaqueDeIcmsProprio,
      destaqueDeIcmsPorST: this.destaqueDeIcmsPorST,
      dataDeEmissao: this.props.documento.danfe.dataDaEmissao,
    };
  }
}

export { FormularioDeSeguranca };
