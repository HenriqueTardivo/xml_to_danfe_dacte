import { Endereco } from "./../../../entities/endereco";
import { INfe } from "../../../interfaces/INfe";
import {
  Transportador,
  TransportadorProps,
} from "../../../entities/transportador";

export function makeTransportador(json: INfe) {
  const transportadorProps: TransportadorProps = {
    nome: json.nfeProc?.NFe.infNFe.transp?.transporta?.xNome?._text,
    registroNacional: json.nfeProc?.NFe.infNFe.transp?.transporta?.CNPJ?._text,
    inscricaoEstadual: json.nfeProc?.NFe.infNFe.transp?.transporta?.IE?._text,
    placaDoVeiculo: json.nfeProc?.NFe.infNFe.transp?.veicTransp?.placa?._text,
    ufDaPlacaDoVeiculo: json.nfeProc?.NFe.infNFe.transp?.veicTransp?.UF?._text,
    endereco: new Endereco({
      logradouro: json.nfeProc?.NFe?.infNFe?.transp?.transporta?.xEnder?._text,
      municipio: json.nfeProc?.NFe?.infNFe?.transp?.transporta?.xMun?._text,
      uf: json.nfeProc?.NFe?.infNFe?.transp?.transporta?.UF?._text,
    }),
  };

  return new Transportador(transportadorProps);
}
