import { DestinatarioProps } from "./../../../entities/destinatario";
import { Endereco } from "./../../../entities/endereco";
import { INfe } from "../../../interfaces/INfe";
import { Destinatario } from "../../../entities/destinatario";

export function makeDestinatario(json: INfe) {
  const numero = json.nfeProc?.NFe.infNFe.dest.enderDest.nro?._text;

  const destinatarioProps: DestinatarioProps = {
    nome: json.nfeProc?.NFe.infNFe.dest.xNome?._text,
    registroNacional: json.nfeProc?.NFe.infNFe.dest.CNPJ?._text,
    telefone: json.nfeProc?.NFe.infNFe?.dest?.enderDest?.fone?._text,
    inscricaoEstadual: json.nfeProc?.NFe.infNFe?.dest?.IE?._text,
    endereco: new Endereco({
      logradouro: json.nfeProc?.NFe.infNFe.dest.enderDest.xLgr?._text,
      numero: numero ? Number(numero) : undefined,
      cep: json.nfeProc?.NFe.infNFe.dest.enderDest.CEP?._text,
      bairro: json.nfeProc?.NFe.infNFe.dest.enderDest.xBairro?._text,
      municipio: json.nfeProc?.NFe.infNFe.dest.enderDest.xMun?._text,
      cidade: json.nfeProc?.NFe.infNFe.dest.enderDest.xMun?._text,
      uf: json.nfeProc?.NFe.infNFe.dest.enderDest.UF?._text,
    }),
  };

  return new Destinatario(destinatarioProps);
}
