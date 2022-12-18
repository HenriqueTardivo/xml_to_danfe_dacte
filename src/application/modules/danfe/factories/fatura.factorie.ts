import { FaturaProps, Fatura } from "../../../entities/fatura";
import { INfe } from "../../../interfaces/INfe";

export function makeFatura(json: INfe) {
  const faturaProps: FaturaProps = {
    numero: Number(json.nfeProc?.NFe?.infNFe?.cobr?.fat?.nFat?._text),
    valorDoDesconto: Number(
      json.nfeProc?.NFe?.infNFe?.cobr?.fat?.vOrig?._text || 0
    ),
    valorOriginal: Number(
      json.nfeProc?.NFe?.infNFe?.cobr?.fat?.vOrig?._text || 0
    ),
    valorLiquido: Number(
      json.nfeProc?.NFe?.infNFe?.cobr?.fat?.vLiq?._text || 0
    ),
    formaDePagamento: Number(
      json.nfeProc?.NFe.infNFe.pag?.detPag?.indPag?._text
    ),
  };

  return new Fatura(faturaProps);
}
