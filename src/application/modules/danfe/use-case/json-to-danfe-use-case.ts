import { filePath } from "../../../utils/filePath";
import { INfe } from "../../../interfaces/INfe";
import fs from "fs";
import {
  makeDanfe,
  makeDestinatario,
  makeTransportador,
  makeProtocolo,
  makeEmitente,
  makeImposto,
  makeVolumes,
  makeDuplicata,
  makeFatura,
} from "../factories";
import { Documento } from "../../../entities";
import { makeItem } from "../factories/item.factorie";

class JsonToDanfe {
  async jsonToPDF(json: INfe, nr_chacesso: string): Promise<string> {
    const pathDoArquivoPdf = `${filePath}/${nr_chacesso}.pdf`;

    const duplicataJson = json.nfeProc?.NFe?.infNFe?.cobr?.dup;

    const itens = json.nfeProc?.NFe.infNFe.det;

    const danfe = makeDanfe(json),
      emitente = makeEmitente(json),
      destinatario = makeDestinatario(json),
      transportador = makeTransportador(json),
      protocolo = makeProtocolo(json),
      impostos = makeImposto(json),
      volumes = makeVolumes(json),
      fatura = json.nfeProc?.NFe?.infNFe?.cobr?.fat && makeFatura(json),
      duplicata = duplicataJson
        ? Array.isArray(duplicataJson)
          ? duplicataJson.map(makeDuplicata)
          : Array(makeDuplicata(duplicataJson))
        : undefined;

    const documento = new Documento({
      danfe,
      emitente,
      destinatario,
      transportador,
      protocolo,
      impostos,
      volumes,
      fatura,
      duplicata,
    });

    if (itens) {
      Array.isArray(itens)
        ? itens.forEach((item) => {
            documento.addItem(makeItem(item));
          })
        : documento.addItem(makeItem(itens));
    }

    return pathDoArquivoPdf;
  }
}

export { JsonToDanfe };
