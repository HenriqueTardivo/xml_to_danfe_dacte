import { ImpostosProps, Impostos } from "./../../../entities/imposto";
import { INfe } from "../../../interfaces/INfe";

export function makeImposto(json: INfe) {
  const impostoProps: ImpostosProps = {
    baseDeCalculoIcms: Number(
      json.nfeProc?.NFe.infNFe.total?.ICMSTot.vBC?._text || 0
    ),
    valorDoIcms: Number(
      json.nfeProc?.NFe.infNFe.total?.ICMSTot.vICMS?._text || 0
    ),
    baseDeCalculoIcmsSt: Number(
      json.nfeProc?.NFe.infNFe.total?.ICMSTot.vBCST?._text || 0
    ),
    valorDoIcmsSt: Number(
      json.nfeProc?.NFe.infNFe.total?.ICMSTot.vST?._text || 0
    ),
    valorDoImpostoDeImportacao: Number(
      json.nfeProc?.NFe.infNFe.total.ICMSTot.vII._text || 0
    ),
    valorDoPis: Number(
      json.nfeProc?.NFe.infNFe.total?.ICMSTot.vPIS?._text || 0
    ),
    valorTotalDoIpi: Number(
      json.nfeProc?.NFe.infNFe.total?.ICMSTot.vIPI?._text || 0
    ),
    valorDaCofins: Number(
      json.nfeProc?.NFe.infNFe.total?.ICMSTot.vCOFINS?._text || 0
    ),
    valorTotTrib: Number(
      json.nfeProc?.NFe.infNFe.total?.ICMSTot?.vTotTrib?._text || 0
    ),
    valorFcp: Number(json.nfeProc?.NFe.infNFe.total?.ICMSTot?.vFCP?._text || 0),
    valorDoIcmsUfRemet: Number(
      json.nfeProc?.NFe.infNFe.total?.ICMSTot?.vICMSUFRemet?._text || 0
    ),
    valorDoIcmsUfDest: Number(
      json.nfeProc?.NFe.infNFe.total?.ICMSTot?.vICMSUFDest?._text || 0
    ),
    baseDeCalculoDoIssqn: 0,
    valorTotalDoIssqn: 0,
  };

  return new Impostos(impostoProps);
}
