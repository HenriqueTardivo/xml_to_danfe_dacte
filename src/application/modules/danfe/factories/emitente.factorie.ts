import { Endereco } from "./../../../entities/endereco";
import { EmitenteProps } from "./../../../entities/emitente";
import { INfe } from "../../../interfaces/INfe";
import { Emitente } from "../../../entities/emitente";

export function makeEmitente(json: INfe) {
  const numero = json.nfeProc?.NFe.infNFe.emit.enderEmit.nro?._text;

  const emitenteProps: EmitenteProps = {
    nome: json.nfeProc?.NFe.infNFe.emit.xNome?._text,
    registroNacional: json.nfeProc?.NFe.infNFe.emit.CNPJ?._text,
    inscricaoEstadual: json.nfeProc?.NFe.infNFe.emit.IE?._text,
    telefone: json.nfeProc?.NFe.infNFe.emit?.enderEmit?.fone?._text,
    email: json.nfeProc?.NFe.infNFe.emit?.enderEmit?.email?._text,
    endereco: new Endereco({
      logradouro: json.nfeProc?.NFe.infNFe.emit.enderEmit.xLgr?._text,
      numero: numero ? Number(numero) : undefined,
      complemento: json.nfeProc?.NFe.infNFe.emit.enderEmit.xCpl?._text,
      cep: json.nfeProc?.NFe.infNFe.emit.enderEmit.CEP?._text,
      bairro: json.nfeProc?.NFe.infNFe.emit.enderEmit.xBairro?._text,
      municipio: json.nfeProc?.NFe.infNFe.emit.enderEmit?.xMun?._text,
      cidade: json.nfeProc?.NFe.infNFe.emit.enderEmit.xMun?._text,
      uf: json.nfeProc?.NFe.infNFe.emit.enderEmit.UF?._text,
    }),
  };

  return new Emitente(emitenteProps);
}
