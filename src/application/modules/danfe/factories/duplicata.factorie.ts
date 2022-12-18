import { DuplicataProps } from "./../../../entities/duplicata";
import { Duplicata } from "application/entities";
import { Iduplicata } from "../../../interfaces/INfe";

export function makeDuplicata(dup: Iduplicata) {
  const duplicataProps: DuplicataProps = {
    numero: dup?.nDup?._text ? Number(dup?.nDup?._text) : undefined,
    vencimento: dup?.dVenc?._text,
    valor: Number(dup?.vDup?._text || 0),
  };

  return new Duplicata(duplicataProps);
}
