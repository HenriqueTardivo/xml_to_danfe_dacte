import { VolumesProps, Volumes } from "./../../../entities/volumes";
import { INfe } from "../../../interfaces/INfe";

export function makeVolumes(json: INfe) {
  const volumeProps: VolumesProps = {
    quantidade: Number(json.nfeProc?.NFe.infNFe.transp?.vol?.qVol?._text || 0),
    especie: json.nfeProc?.NFe.infNFe.transp?.vol?.esp?._text,
    marca: json.nfeProc?.NFe.infNFe.transp?.vol?.marca?._text,
    pesoBruto: Number(json.nfeProc?.NFe.infNFe.transp?.vol?.pesoB?._text || 0),
    pesoLiquido: Number(
      json.nfeProc?.NFe.infNFe.transp?.vol?.pesoL?._text || 0
    ),
  };

  return new Volumes(volumeProps);
}
