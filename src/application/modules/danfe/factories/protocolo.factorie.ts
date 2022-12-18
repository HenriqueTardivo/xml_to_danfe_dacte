import { ProtocoloProps, Protocolo } from "./../../../entities/protocolo";
import { INfe } from "../../../interfaces/INfe";

export function makeProtocolo(json: INfe) {
  const protocoloProps: ProtocoloProps = {
    data: json.nfeProc?.protNFe.infProt.dhRecbto?._text,
    codigo: json.nfeProc?.protNFe.infProt.nProt?._text,
  };

  return new Protocolo(protocoloProps);
}
