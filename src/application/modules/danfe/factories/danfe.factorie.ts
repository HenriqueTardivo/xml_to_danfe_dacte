import { INfe } from "../../../interfaces/INfe";
import { Danfe } from "./../../../entities/danfe";
import { DanfeProps } from "./../../../entities/danfe";

export function makeDanfe(json: INfe) {
  const danfeProps: DanfeProps = {
    chaveDeAcesso: json.nfeProc?.protNFe.infProt.chNFe?._text as string,
    informacoesComplementares:
      json.nfeProc?.NFe?.infNFe?.infAdic?.infAdFisco?._text ||
      "" + "" + json.nfeProc?.NFe?.infNFe?.infAdic?.infCpl?._text ||
      "" + "" + json.nfeProc?.NFe?.infNFe?.infAdic?.obsCont?._text ||
      "" + "" + json.nfeProc?.NFe?.infNFe?.infAdic?.obsFisco?._text ||
      "" + "" + json.nfeProc?.NFe?.infNFe?.infAdic?.procRef?._text ||
      "",
    valorTotalDaNota: Number(
      json.nfeProc?.NFe.infNFe.total.ICMSTot.vNF?._text || 0
    ),
    valorTotalDosProdutos: Number(
      json.nfeProc?.NFe.infNFe.total?.ICMSTot?.vProd?._text || 0
    ),
    valorTotalDosServicos: Number(
      json.nfeProc?.NFe.infNFe.total?.ICMSTot?.vServ?._text || 0
    ),
    inscricaoEstadualDoSubstitutoTributario:
      json.nfeProc?.NFe?.infNFe?.emit?.IEST?._text,
    valorDoFrete: Number(
      json.nfeProc?.NFe.infNFe.total?.ICMSTot?.vFrete?._text || 0
    ),
    valorDoSeguro: Number(
      json.nfeProc?.NFe.infNFe.total?.ICMSTot?.vSeg?._text || 0
    ),
    desconto: Number(
      json.nfeProc?.NFe.infNFe.total?.ICMSTot?.vDesc?._text || 0
    ),
    outrasDespesas: Number(
      json.nfeProc?.NFe.infNFe.total?.ICMSTot?.vOutro?._text || 0
    ),
    tipo: json.nfeProc?.NFe.infNFe.ide.tpNF._text as string,
    numero: json.nfeProc?.NFe.infNFe.ide.nNF?._text as string,
    serie: json.nfeProc?.NFe.infNFe.ide.serie?._text as string,
    dataDaEmissao: json.nfeProc?.NFe.infNFe.ide.dhEmi?._text as string,
    horarioEntradaSaida: json.nfeProc?.NFe?.infNFe?.ide?.dhSaiEnt?._text,
    dataDaEntradaOuSaida: json.nfeProc?.NFe?.infNFe?.ide?.dhSaiEnt?._text,
    modalidadeDoFrete: json.nfeProc?.NFe.infNFe?.transp?.modFrete
      ?._text as string,
    naturezaDaOperacao: json.nfeProc?.NFe.infNFe.ide.natOp?._text as string,
  };

  return new Danfe(danfeProps);
}
