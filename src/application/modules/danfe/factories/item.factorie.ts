import { ItemDanfe, ItemDanfeProps } from "../../../entities/item-danfe";
import { Idet, Icms_generico } from "../../../interfaces/INfe";

export function makeItem(item: Idet) {
  const find_ICMS_prod = (imposto: any): Icms_generico => {
    let tipoIcms = JSON.stringify(imposto).substring(2, 8);

    return {
      ICMS00: imposto.ICMS00,
      ICMS10: imposto.ICMS10,
      ICMS30: imposto.ICMS30,
      ICMS40: imposto.ICMS40,
      ICMS51: imposto.ICMS51,
      ICMS60: imposto.ICMS60,
      ICMS70: imposto.ICMS70,
      ICMS90: imposto.ICMS90,
      ICMS20: imposto.ICMS20,
    }[tipoIcms];
  };

  const icms = find_ICMS_prod(item.imposto.ICMS);

  const itemProps: ItemDanfeProps = {
    codigo: item.prod?.cProd?._text,
    descricao: item.prod?.xProd?._text,
    ncmSh: item.prod?.NCM?._text,
    cfop: item.prod?.CFOP?._text,
    unidade: item.prod?.uCom?._text,
    quantidade: Number(item.prod?.qCom?._text),
    valorUnitario: Number(item.prod?.vUnCom?._text),
    valorTotal: Number(item.prod?.vProd?._text),
    baseDeCalculoIcms: Number(icms?.vBC?._text),
    valorDoIcms: Number(icms?.vICMS?._text),
    valorDoIpi: Number(item.imposto.IPI?.IPITrib?.vIPI?._text),
    aliquotaDoIcms: Number(icms?.pICMS?._text),
    aliquotaDoIpi: Number(item.imposto.IPI?.IPITrib?.pIPI?._text),
  };

  return new ItemDanfe(itemProps);
}
