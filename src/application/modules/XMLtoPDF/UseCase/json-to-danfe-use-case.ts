import { Idet, INfe, Icms_generico, Iduplicata } from "../../interfaces/INfe";
import { MaskFields } from "../../../utils/MaskFields";

class JsonToDanfe {
  find_ICMS_prod(imposto: any): Icms_generico {
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
  }

  async jsonToPDF(json: INfe): Promise<string> {
    const maskFields = new MaskFields();

    const danfe_roma = require("../../pdf_generator/danfe-dacte/app"),
      Gerador = danfe_roma.Gerador,
      Danfe = danfe_roma.Danfe,
      Emitente = danfe_roma.Emitente,
      Destinatario = danfe_roma.Destinatario,
      Transportador = danfe_roma.Transportador,
      Endereco = danfe_roma.Endereco,
      Protocolo = danfe_roma.Protocolo,
      Impostos = danfe_roma.Impostos,
      Volumes = danfe_roma.Volumes,
      Item = danfe_roma.Item,
      Duplicata = danfe_roma.Duplicata,
      Fatura = danfe_roma.Fatura;

    let pdfBase64 = "";

    var emitente = new Emitente();
    emitente.comNome(json.nfeProc?.NFe.infNFe.emit.xNome?._text);
    emitente.comRegistroNacional(maskFields.maskCnpj(json.nfeProc?.NFe.infNFe.emit.CNPJ?._text));
    emitente.comInscricaoEstadual(json.nfeProc?.NFe.infNFe.emit.IE?._text);
    emitente.comTelefone(json.nfeProc?.NFe.infNFe.emit?.enderEmit?.fone?._text);
    emitente.comEmail(json.nfeProc?.NFe.infNFe.emit?.enderEmit?.email?._text);

    emitente.comEndereco(
      new Endereco()
        .comLogradouro(json.nfeProc?.NFe.infNFe.emit.enderEmit.xLgr?._text)
        .comNumero(`N°${json.nfeProc?.NFe.infNFe.emit.enderEmit.nro?._text}`)
        .comComplemento(json.nfeProc?.NFe.infNFe.emit.enderEmit.xCpl?._text)
        .comCep(maskFields.maskCEP(json.nfeProc?.NFe.infNFe.emit.enderEmit.CEP?._text))
        .comBairro(json.nfeProc?.NFe.infNFe.emit.enderEmit.xBairro?._text)
        .comMunicipio(json.nfeProc?.NFe.infNFe.emit.enderEmit?.xMun?._text)
        .comCidade(json.nfeProc?.NFe.infNFe.emit.enderEmit.xMun?._text)
        .comUf(json.nfeProc?.NFe.infNFe.emit.enderEmit.UF?._text)
    );

    var destinatario = new Destinatario();
    destinatario.comNome(json.nfeProc?.NFe.infNFe.dest.xNome?._text);
    destinatario.comRegistroNacional(maskFields.maskCnpj(json.nfeProc?.NFe.infNFe.dest.CNPJ?._text));
    destinatario.comTelefone(json.nfeProc?.NFe.infNFe?.dest?.enderDest?.fone?._text);
    destinatario.comInscricaoEstadual(json.nfeProc?.NFe.infNFe?.dest?.IE?._text);
    destinatario.comEndereco(
      new Endereco()
        .comLogradouro(json.nfeProc?.NFe.infNFe.dest.enderDest.xLgr?._text)
        .comNumero(json.nfeProc?.NFe.infNFe.dest.enderDest.nro?._text)
        // .comComplemento("complemento")
        .comCep(maskFields.maskCEP(json.nfeProc?.NFe.infNFe.dest.enderDest.CEP?._text))
        .comBairro(json.nfeProc?.NFe.infNFe.dest.enderDest.xBairro?._text)
        .comMunicipio(json.nfeProc?.NFe.infNFe.dest.enderDest.xMun?._text)
        .comCidade(json.nfeProc?.NFe.infNFe.dest.enderDest.xMun?._text)
        .comUf(json.nfeProc?.NFe.infNFe.dest.enderDest.UF?._text)
    );

    var transportador = new Transportador();
    transportador.comNome(json.nfeProc?.NFe.infNFe.transp?.transporta?.xNome?._text);
    transportador.comRegistroNacional(maskFields.maskCnpj(json.nfeProc?.NFe.infNFe.transp?.transporta?.CNPJ?._text));
    transportador.comInscricaoEstadual(json.nfeProc?.NFe.infNFe.transp?.transporta?.IE?._text);
    // transportador.comCodigoAntt("");
    transportador.comPlacaDoVeiculo(json.nfeProc?.NFe.infNFe.transp?.veicTransp?.placa?._text);
    transportador.comUfDaPlacaDoVeiculo(json.nfeProc?.NFe.infNFe.transp?.veicTransp?.UF?._text);
    transportador.comEndereco(
      new Endereco()
        .comLogradouro(json.nfeProc?.NFe?.infNFe?.transp?.transporta?.xEnder?._text)
        .comMunicipio(json.nfeProc?.NFe?.infNFe?.transp?.transporta?.xMun?._text)
        .comUf(json.nfeProc?.NFe?.infNFe?.transp?.transporta?.UF?._text)
    );

    var protocolo = new Protocolo();

    protocolo.comData(maskFields.maskDate(json.nfeProc?.protNFe.infProt.dhRecbto?._text));

    protocolo.comCodigo(json.nfeProc?.protNFe.infProt.nProt?._text);
    var impostos = new Impostos();
    impostos.comBaseDeCalculoDoIcms(maskFields.maskNumber(json.nfeProc?.NFe.infNFe.total?.ICMSTot.vBC?._text));
    impostos.comValorDoIcms(maskFields.maskNumber(json.nfeProc?.NFe.infNFe.total?.ICMSTot.vICMS?._text));
    impostos.comBaseDeCalculoDoIcmsSt(maskFields.maskNumber(json.nfeProc?.NFe.infNFe.total?.ICMSTot.vBCST?._text));
    impostos.comValorDoIcmsSt(maskFields.maskNumber(json.nfeProc?.NFe.infNFe.total?.ICMSTot.vST?._text));
    impostos.comValorDoImpostoDeImportacao(maskFields.maskNumber(json.nfeProc?.NFe.infNFe.total.ICMSTot.vII._text));
    impostos.comValorDoPis(maskFields.maskNumber(json.nfeProc?.NFe.infNFe.total?.ICMSTot.vPIS?._text));
    impostos.comValorTotalDoIpi(maskFields.maskNumber(json.nfeProc?.NFe.infNFe.total?.ICMSTot.vIPI?._text));
    impostos.comValorDaCofins(maskFields.maskNumber(json.nfeProc?.NFe.infNFe.total?.ICMSTot.vCOFINS?._text));
    impostos.comValorTotTrib(maskFields.maskNumber(json.nfeProc?.NFe.infNFe.total?.ICMSTot?.vTotTrib?._text));
    impostos.comValorFCP(maskFields.maskNumber(json.nfeProc?.NFe.infNFe.total?.ICMSTot?.vFCP?._text));
    impostos.comValorICMSufRemet(maskFields.maskNumber(json.nfeProc?.NFe.infNFe.total?.ICMSTot?.vICMSUFRemet?._text));
    impostos.comValorICMSufDest(maskFields.maskNumber(json.nfeProc?.NFe.infNFe.total?.ICMSTot?.vICMSUFDest?._text));
    impostos.comBaseDeCalculoDoIssqn("");
    impostos.comValorTotalDoIssqn("");

    var volumes = new Volumes();
    volumes.comQuantidade(maskFields.maskNumber(json.nfeProc?.NFe.infNFe.transp?.vol?.qVol?._text));
    volumes.comEspecie(json.nfeProc?.NFe.infNFe.transp?.vol?.esp?._text);
    volumes.comMarca(json.nfeProc?.NFe.infNFe.transp?.vol?.marca?._text);
    volumes.comPesoBruto(maskFields.maskNumber(json.nfeProc?.NFe.infNFe.transp?.vol?.pesoB?._text));
    volumes.comPesoLiquido(maskFields.maskNumber(json.nfeProc?.NFe.infNFe.transp?.vol?.pesoL?._text));

    if (json.nfeProc?.NFe?.infNFe?.cobr?.fat) {
      var fatura = new Fatura();
      fatura.comNumero(json.nfeProc?.NFe?.infNFe?.cobr?.fat?.nFat?._text);
      fatura.comValorOriginal(maskFields.maskNumber(json.nfeProc?.NFe?.infNFe?.cobr?.fat?.vOrig?._text));
      fatura.comValorDoDesconto(maskFields.maskNumber(json.nfeProc?.NFe?.infNFe?.cobr?.fat?.vDesc?._text));
      fatura.comValorLiquido(maskFields.maskNumber(json.nfeProc?.NFe?.infNFe?.cobr?.fat?.vLiq?._text));
      fatura.comFormaDePagamento(json.nfeProc?.NFe.infNFe.pag?.detPag?.indPag?._text);
    }

    var danfe = new Danfe();
    danfe.comChaveDeAcesso(json.nfeProc?.protNFe.infProt.chNFe?._text);
    danfe.comEmitente(emitente);
    danfe.comFatura(fatura);
    danfe.comDestinatario(destinatario);
    danfe.comTransportador(transportador);
    danfe.comProtocolo(protocolo);
    danfe.comImpostos(impostos);
    danfe.comVolumes(volumes);
    danfe.comTipo(json.nfeProc?.NFe.infNFe.ide.tpNF._text);
    danfe.comNaturezaDaOperacao(json.nfeProc?.NFe.infNFe.ide.natOp?._text);
    danfe.comNumero(json.nfeProc?.NFe.infNFe.ide.nNF?._text);
    danfe.comSerie(json.nfeProc?.NFe.infNFe.ide.serie?._text);
    danfe.comInformacoesComplementares(
      json.nfeProc?.NFe?.infNFe?.infAdic?.infAdFisco?._text ||
        "" + "" + json.nfeProc?.NFe?.infNFe?.infAdic?.infCpl?._text ||
        "" + "" + json.nfeProc?.NFe?.infNFe?.infAdic?.obsCont?._text ||
        "" + "" + json.nfeProc?.NFe?.infNFe?.infAdic?.obsFisco?._text ||
        "" + "" + json.nfeProc?.NFe?.infNFe?.infAdic?.procRef?._text ||
        ""
    );

    if (json.nfeProc?.NFe?.infNFe?.cobr?.dup && Array.isArray(json.nfeProc?.NFe?.infNFe?.cobr?.dup)) {
      danfe.comDuplicatas(
        json.nfeProc?.NFe?.infNFe?.cobr?.dup.map((duplicata: Iduplicata) => {
          return new Duplicata().comNumero(duplicata?.nDup?._text).comVencimento(maskFields.maskDate(duplicata?.dVenc?._text)).comValor(maskFields.maskNumber(duplicata?.vDup?._text));
        })
      );
    } else if (json.nfeProc?.NFe?.infNFe?.cobr?.dup) {
      danfe.comDuplicatas(
        Array(
          new Duplicata()
            .comNumero(json.nfeProc?.NFe?.infNFe?.cobr?.dup?.nDup?._text)
            .comVencimento(maskFields.maskDate(json.nfeProc?.NFe?.infNFe?.cobr?.dup?.dVenc._text))
            .comValor(maskFields.maskNumber(json.nfeProc?.NFe?.infNFe?.cobr?.dup?.vDup?._text))
        )
      );
    }

    if (json.nfeProc?.NFe.infNFe.ide.dhEmi?._text) {
      danfe.comDataDaEmissao(maskFields.maskDate(json.nfeProc?.NFe.infNFe.ide.dhEmi?._text));
    } else if (json.nfeProc?.NFe.infNFe.ide.dEmi?._text) {
      danfe.comDataDaEmissao(maskFields.maskDate(json.nfeProc?.NFe.infNFe.ide.dEmi?._text));
    }

    if (json.nfeProc?.NFe?.infNFe?.ide?.dhSaiEnt?._text) {
      danfe.comDataDaEntradaOuSaida(maskFields.maskDate(json.nfeProc?.NFe?.infNFe?.ide?.dhSaiEnt?._text));

      danfe.comHorarioEntradaSaida(maskFields.maskTime(json.nfeProc?.NFe?.infNFe?.ide?.dhSaiEnt?._text));
    }

    danfe.comModalidadeDoFrete(json.nfeProc?.NFe.infNFe?.transp?.modFrete?._text);
    danfe.comInscricaoEstadualDoSubstitutoTributario(json.nfeProc?.NFe?.infNFe?.emit?.IEST?._text);

    danfe.comValorTotalDaNota(maskFields.maskNumber(json.nfeProc?.NFe.infNFe.total.ICMSTot.vNF?._text));
    danfe.comValorTotalDosProdutos(maskFields.maskNumber(json.nfeProc?.NFe.infNFe.total?.ICMSTot?.vProd?._text));
    danfe.comValorTotalDosServicos(maskFields.maskNumber(json.nfeProc?.NFe.infNFe.total?.ICMSTot?.vServ?._text));
    danfe.comValorDoFrete(maskFields.maskNumber(json.nfeProc?.NFe.infNFe.total?.ICMSTot?.vFrete?._text));
    danfe.comValorDoSeguro(maskFields.maskNumber(json.nfeProc?.NFe.infNFe.total?.ICMSTot?.vSeg?._text));
    danfe.comDesconto(maskFields.maskNumber(json.nfeProc?.NFe.infNFe.total?.ICMSTot?.vDesc?._text));
    danfe.comOutrasDespesas(maskFields.maskNumber(json.nfeProc?.NFe.infNFe.total?.ICMSTot?.vOutro?._text));

    if (json.nfeProc?.NFe.infNFe.det && Array.isArray(json.nfeProc?.NFe.infNFe.det)) {
      json.nfeProc.NFe.infNFe.det.forEach((item: Idet) => {
        let icms = this.find_ICMS_prod(item.imposto.ICMS);

        danfe.adicionarItem(
          new Item()
            .comCodigo(item.prod?.cProd?._text)
            .comDescricao(item.prod?.xProd?._text)
            .comNcmSh(item.prod?.NCM?._text)
            .comOCst(icms?.CST?._text)
            .comCfop(item.prod?.CFOP?._text)
            .comUnidade(String(item.prod?.uCom?._text).toUpperCase())
            .comQuantidade(maskFields.maskNumber(item.prod?.qCom?._text))
            .comValorUnitario(maskFields.maskNumber(item.prod?.vUnCom?._text))
            .comValorTotal(maskFields.maskNumber(item.prod?.vProd?._text))
            .comBaseDeCalculoDoIcms(maskFields.maskNumber(icms?.vBC?._text))
            .comValorDoIcms(maskFields.maskNumber(icms?.vICMS?._text))
            .comValorDoIpi(maskFields.maskNumber(item.imposto.IPI?.IPITrib?.vIPI?._text))
            .comAliquotaDoIcms(maskFields.maskNumber(icms?.pICMS?._text))
            .comAliquotaDoIpi(maskFields.maskNumber(item.imposto.IPI?.IPITrib?.pIPI?._text))
        );
      });
    } else if (json.nfeProc?.NFe.infNFe.det) {
      let icms = this.find_ICMS_prod(json.nfeProc?.NFe.infNFe.det?.imposto?.ICMS);

      danfe.adicionarItem(
        new Item()
          .comCodigo(json.nfeProc?.NFe.infNFe.det?.prod?.cProd?._text)
          .comDescricao(json.nfeProc?.NFe.infNFe.det?.prod?.xProd?._text)
          .comNcmSh(json.nfeProc?.NFe.infNFe.det?.prod?.NCM?._text)
          .comOCst(icms?.CST?._text)
          .comCfop(json.nfeProc?.NFe.infNFe.det?.prod?.CFOP?._text)
          .comUnidade(String(json.nfeProc?.NFe.infNFe.det?.prod?.uCom?._text).toUpperCase())
          .comQuantidade(maskFields.maskNumber(json.nfeProc?.NFe.infNFe.det?.prod?.qCom?._text))
          .comValorUnitario(maskFields.maskNumber(json.nfeProc?.NFe.infNFe.det?.prod?.vUnCom?._text))
          .comValorTotal(maskFields.maskNumber(json.nfeProc?.NFe.infNFe.det?.prod?.vProd?._text))
          .comBaseDeCalculoDoIcms(maskFields.maskNumber(icms?.vBC?._text))
          .comValorDoIcms(maskFields.maskNumber(icms?.vICMS?._text))
          .comValorDoIpi(maskFields.maskNumber(json.nfeProc.NFe.infNFe.det.imposto.IPI?.IPITrib?.vIPI?._text))
          .comAliquotaDoIcms(maskFields.maskNumber(icms?.pICMS?._text))
          .comAliquotaDoIpi(maskFields.maskNumber(json.nfeProc.NFe.infNFe.det.imposto.IPI?.IPITrib?.pIPI?._text))
      );
    }

    new Gerador(danfe).gerarPDF(
      {
        ambiente: json.nfeProc?.protNFe.infProt.tpAmb._text == "2" ? "homologacao" : "producao",
        ajusteYDoLogotipo: -4,
        ajusteYDaIdentificacaoDoEmitente: 4,
        creditos: "",
      },
      function (err: any, pdf: PDFKit.PDFDocument) {
        if (err) {
          throw err;
        }

        const chunks: Buffer[] = [];

        pdf.on("data", (chunk: Buffer) => {
          chunks.push(chunk);
        });

        pdf.on("end", () => {
          const data = Buffer.concat(chunks);
          pdfBase64 = data.toString("base64");
        });
      }
    );

    return new Promise((resolve) => setTimeout(() => resolve(pdfBase64)));
  }
}

export { JsonToDanfe };
