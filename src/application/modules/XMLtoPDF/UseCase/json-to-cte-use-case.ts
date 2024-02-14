import { IDaCte, IinfNFe, Icms_generico } from "../../interfaces/IDaCte";
import { MaskFields } from "../../../utils/MaskFields";

class JsonToCTE {
  returnICMS(imposto: any): Icms_generico | null {
    let tipoIcms = JSON.stringify(imposto).substring(2, 8);

    return {
      ICMS00: imposto.ICMS00,
      ICMS20: imposto.ICMS20,
      ICMS45: imposto.ICMS45,
      ICMS60: imposto.ICMS60,
      ICMS90: imposto.ICMS90,
      ICMSSN: imposto.ICMSSN,
      ICMSOu: imposto.ICMSOutraUF,
    }[tipoIcms];
  }

  montaObservacao(obs: any, obs2: any) {
    let result = "";

    if (obs) {
      result = obs;
    }

    if (Array.isArray(obs2)) {
      obs2.forEach((item) => {
        result += " " + item.xTexto._text;
      });
    } else if (obs2) {
      result += obs2.xTexto._text;
    }

    return result;
  }

  async jsonToPDF(json: IDaCte): Promise<string> {
    const maskFields = new MaskFields();

    var fs = require("fs"),
      danfe_roma = require("../../pdf_generator/danfe-dacte/app"),
      Gerador = danfe_roma.Gerador,
      Danfe = danfe_roma.Danfe,
      Emitente = danfe_roma.Emitente,
      Destinatario = danfe_roma.Destinatario,
      Transportador = danfe_roma.Transportador,
      Endereco = danfe_roma.Endereco,
      Protocolo = danfe_roma.Protocolo,
      Impostos = danfe_roma.Impostos,
      Item = danfe_roma.Item,
      CteInfo = danfe_roma.CteInfo,
      Expeditor = danfe_roma.Expeditor,
      Recebedor = danfe_roma.Recebedor;

    let pdfBase64 = "";

    var cteInfo = new CteInfo();
    cteInfo.comTpCte(json.cteProc?.CTe?.infCte?.ide?.tpCTe?._text);
    cteInfo.comTpServ(json.cteProc?.CTe?.infCte.ide?.tpServ?._text);

    if (json.cteProc?.CTe?.infCte.ide?.toma3?.toma?._text) {
      cteInfo.comToma(json.cteProc?.CTe?.infCte?.ide?.toma3?.toma?._text);
    } else {
      cteInfo.comToma("4");
    }
    cteInfo.comModalFrete(json.cteProc?.CTe?.infCte.ide.modal?._text);
    cteInfo.comCfopFrete(json.cteProc?.CTe?.infCte.ide.CFOP?._text + " - " + json.cteProc?.CTe?.infCte.ide.natOp?._text);
    cteInfo.comInicioPrestacao(String(json.cteProc?.CTe?.infCte.ide.xMunIni._text + " - " + json.cteProc?.CTe?.infCte.ide.UFIni?._text).toUpperCase());
    cteInfo.comFinalDaPrestacao(String(json.cteProc?.CTe?.infCte.ide.xMunFim._text + " - " + json.cteProc?.CTe?.infCte.ide.UFFim?._text).toUpperCase());
    cteInfo.comModelo(json.cteProc?.CTe?.infCte.ide.mod._text);
    cteInfo.comProdPred(json.cteProc?.CTe?.infCte?.infCTeNorm?.infCarga?.proPred?._text);
    cteInfo.comCarga(json.cteProc?.CTe?.infCte?.infCTeNorm?.infCarga?.infQ);
    cteInfo.comObservacao(this.montaObservacao(json.cteProc?.CTe?.infCte?.compl?.xObs?._text, json.cteProc?.CTe?.infCte?.compl?.ObsCont));
    cteInfo.comRNTRC(json.cteProc?.CTe?.infCte?.infCTeNorm?.infModal?.rodo?.RNTRC?._text);
    cteInfo.comCIOT(json.cteProc?.CTe?.infCte?.infCTeNorm?.infModal?.rodo?.CIOT?._text);
    cteInfo.comDataEntrega(maskFields.maskDate(json.cteProc?.CTe?.infCte?.infCTeNorm?.infModal?.rodo?.dPrev?._text));
    cteInfo.comOutrasCaracCarga(
      json.cteProc?.CTe?.infCte.infCTeNorm?.infCarga?.xOutCat?._text /////////
    );
    cteInfo.comComponenteServico(json.cteProc?.CTe?.infCte?.vPrest?.Comp);

    var recebedor = new Recebedor();
    recebedor.comNome(json.cteProc?.CTe?.infCte.receb?.xNome?._text);
    recebedor.comRegistroNacional(maskFields.maskCnpj(json.cteProc?.CTe?.infCte?.receb?.CNPJ?._text));
    recebedor.comInscricaoEstadual(json.cteProc?.CTe?.infCte?.receb?.IE?._text);
    recebedor.comTelefone(json.cteProc?.CTe?.infCte.receb?.fone?._text);
    recebedor.comEmail("");
    recebedor.comEndereco(
      new Endereco()
        .comLogradouro(json.cteProc?.CTe?.infCte.receb?.enderReceb?.xLgr?._text)
        .comNumero(json.cteProc?.CTe?.infCte.receb?.enderReceb?.nro?._text)
        .comComplemento(json.cteProc?.CTe?.infCte.receb?.enderReceb?.xCpl?._text)
        .comCep(maskFields.maskCEP(json.cteProc?.CTe?.infCte.receb?.enderReceb?.CEP?._text))
        .comBairro(json.cteProc?.CTe?.infCte.receb?.enderReceb?.xBairro?._text)
        .comMunicipio(json.cteProc?.CTe?.infCte.receb?.enderReceb?.xMun?._text)
        .comCidade(json.cteProc?.CTe?.infCte.receb?.enderReceb?.xMun?._text)
        .comUf(json.cteProc?.CTe?.infCte.receb?.enderReceb?.UF?._text)
        .comPais(json.cteProc?.CTe?.infCte.receb?.enderReceb?.xPais?._text)
    );

    var expeditor = new Expeditor();
    expeditor.comNome(json.cteProc?.CTe?.infCte.exped?.xNome?._text);
    expeditor.comRegistroNacional(maskFields.maskCnpj(json.cteProc?.CTe?.infCte?.exped?.CNPJ?._text));
    expeditor.comInscricaoEstadual(json.cteProc?.CTe?.infCte?.exped?.IE?._text);
    expeditor.comTelefone(json.cteProc?.CTe?.infCte.exped?.fone?._text);
    expeditor.comEmail("");
    expeditor.comEndereco(
      new Endereco()
        .comLogradouro(json.cteProc?.CTe?.infCte.exped?.enderExped?.xLgr?._text)
        .comNumero(json.cteProc?.CTe?.infCte.exped?.enderExped?.nro?._text)
        .comComplemento(json.cteProc?.CTe?.infCte.exped?.enderExped?.xCpl?._text)
        .comCep(maskFields.maskCEP(json.cteProc?.CTe?.infCte.exped?.enderExped?.CEP?._text))
        .comBairro(json.cteProc?.CTe?.infCte.exped?.enderExped?.xBairro?._text)
        .comMunicipio(json.cteProc?.CTe?.infCte.exped?.enderExped?.xMun?._text)
        .comCidade(json.cteProc?.CTe?.infCte.exped?.enderExped?.xMun?._text)
        .comUf(json.cteProc?.CTe?.infCte.exped?.enderExped?.UF?._text)
        .comPais(json.cteProc?.CTe?.infCte.exped?.enderExped?.xPais?._text)
    );

    var emitente = new Emitente();
    emitente.comNome(json.cteProc?.CTe?.infCte.emit?.xNome?._text);
    emitente.comRegistroNacional(maskFields.maskCnpj(json.cteProc?.CTe?.infCte?.emit?.CNPJ?._text));
    emitente.comInscricaoEstadual(json.cteProc?.CTe?.infCte?.emit?.IE?._text);
    emitente.comTelefone(json.cteProc?.CTe?.infCte.emit?.enderEmit?.fone?._text);
    emitente.comEmail("");
    emitente.comEndereco(
      new Endereco()
        .comLogradouro(json.cteProc?.CTe?.infCte.emit?.enderEmit.xLgr?._text)
        .comNumero(json.cteProc?.CTe?.infCte.emit?.enderEmit.nro?._text)
        .comComplemento(json.cteProc?.CTe?.infCte.emit?.enderEmit.xCpl?._text)
        .comCep(maskFields.maskCEP(json.cteProc?.CTe?.infCte.emit.enderEmit?.CEP?._text))
        .comBairro(json.cteProc?.CTe?.infCte.emit?.enderEmit.xBairro?._text)
        .comMunicipio(String(json.cteProc?.CTe?.infCte.emit?.enderEmit.xMun?._text).toUpperCase())
        .comCidade(json.cteProc?.CTe?.infCte.emit?.enderEmit.xMun?._text)
        .comUf(json.cteProc?.CTe?.infCte.emit?.enderEmit.UF?._text)
        .comPais(json.cteProc?.CTe?.infCte.emit?.enderEmit?.xPais?._text)
    );

    var destinatario = new Destinatario();
    destinatario.comNome(json.cteProc?.CTe?.infCte.dest?.xNome?._text);
    destinatario.comRegistroNacional(maskFields.maskCnpj(json.cteProc?.CTe?.infCte?.dest?.CNPJ?._text));
    destinatario.comTelefone(json.cteProc?.CTe?.infCte.dest?.fone?._text); //Criamos na INfe.ts
    destinatario.comInscricaoEstadual(json.cteProc?.CTe?.infCte?.dest?.IE?._text);
    destinatario.comEndereco(
      new Endereco()
        .comLogradouro(json.cteProc?.CTe?.infCte.dest?.enderDest?.xLgr?._text)
        .comNumero(json.cteProc?.CTe?.infCte.dest?.enderDest?.nro?._text)
        // .comComplemento("") //json.cteProc?.CTe?.infCte.rem?.enderReme.xCpl?._text
        .comCep(maskFields.maskCEP(json.cteProc?.CTe?.infCte.dest?.enderDest?.CEP?._text))
        .comBairro(json.cteProc?.CTe?.infCte.dest?.enderDest?.xBairro?._text)
        .comMunicipio(String(json.cteProc?.CTe?.infCte.dest?.enderDest?.xMun?._text).toUpperCase())
        .comCidade(json.cteProc?.CTe?.infCte.dest?.enderDest?.xMun?._text)
        .comUf(json.cteProc?.CTe?.infCte.dest?.enderDest?.UF?._text)
        .comPais(json.cteProc?.CTe?.infCte.dest?.enderDest?.xPais?._text)
    );

    var transportador = new Transportador();
    transportador.comNome(json.cteProc?.CTe?.infCte.rem?.xNome?._text);
    transportador.comRegistroNacional(maskFields.maskCnpj(json.cteProc?.CTe?.infCte.rem?.CNPJ?._text));
    transportador.comInscricaoEstadual(json.cteProc?.CTe?.infCte.rem?.IE?._text);
    transportador.comTelefone(json.cteProc?.CTe?.infCte?.rem?.fone?._text);
    transportador.comEndereco(
      new Endereco()
        .comLogradouro(json.cteProc?.CTe?.infCte?.rem?.enderReme?.xLgr?._text)
        .comNumero(json.cteProc?.CTe?.infCte?.rem?.enderReme?.nro?._text)
        .comCep(maskFields.maskCEP(json.cteProc?.CTe?.infCte.rem?.enderReme?.CEP?._text))
        .comBairro(json.cteProc?.CTe?.infCte.rem?.enderReme?.xBairro?._text)
        .comMunicipio(String(json.cteProc?.CTe?.infCte.rem?.enderReme?.xMun?._text).toUpperCase())
        .comCidade(json.cteProc?.CTe?.infCte.rem?.enderReme?.xMun?._text)
        .comUf(json.cteProc?.CTe?.infCte.rem?.enderReme?.UF?._text)
        .comPais(json.cteProc?.CTe?.infCte.rem?.enderReme?.xPais?._text)
    );

    var protocolo = new Protocolo();
    protocolo.comCodigo(json.cteProc?.protCTe?.infProt?.nProt?._text);
    protocolo.comData(maskFields.maskDate(json.cteProc?.protCTe?.infProt?.dhRecbto?._text));

    let icms = this.returnICMS(json.cteProc?.CTe?.infCte?.imp?.ICMS);

    var impostos = new Impostos();
    impostos.comBaseDeCalculoDoIcms(maskFields.maskNumber(icms?.vBC?._text || icms?.vBCSTRet?._text || icms?.vBCOutraUF?._text));
    impostos.comValorDoIcms(maskFields.maskNumber(icms?.vICMS?._text || icms?.vICMSOutraUF?._text));
    impostos.comValorDoIcmsSt(maskFields.maskNumber(icms?.vICMSSTRet?._text));
    impostos.comValorDoPis(icms?.CST?._text); /// usado o mesmo campo para CST
    impostos.comValorTotalDoIpi(maskFields.maskNumber(icms?.pICMS?._text || icms?.pICMSOutraUF?._text)); // aliquota ICMS
    impostos.comValorDaCofins(maskFields.maskNumber(json.cteProc?.CTe?.infCte?.imp?.pRedBC?._text)); // RED

    var danfe = new Danfe();
    danfe.comChaveDeAcesso(json.cteProc?.protCTe?.infProt.chCTe?._text);
    danfe.comEmitente(emitente);
    danfe.comDestinatario(destinatario);
    danfe.comTransportador(transportador);
    danfe.comCteInfo(cteInfo);
    danfe.comRecebedor(recebedor);
    danfe.comExpeditor(expeditor);
    danfe.comProtocolo(protocolo);
    danfe.comImpostos(impostos);
    danfe.comTipo("saida");
    danfe.comNaturezaDaOperacao(json.cteProc?.CTe?.infCte.ide.natOp?._text);
    danfe.comNumero(json.cteProc?.CTe?.infCte.ide.nCT?._text);
    danfe.comSerie(json.cteProc?.CTe?.infCte.ide.serie?._text);
    danfe.comDataDaEmissao(maskFields.maskDateTime(json.cteProc?.CTe?.infCte.ide.dhEmi?._text));
    danfe.comDataDaEntradaOuSaida(maskFields.maskDate(json.cteProc?.protCTe?.infProt.dhRecbto?._text));
    danfe.comModalidadeDoFrete(json.cteProc?.CTe?.infCte.ide.modal?._text); // json.cteProc?.CTe?.infCte.ide.mod?._text
    danfe.comInscricaoEstadualDoSubstitutoTributario("");
    danfe.comInformacoesComplementares("");
    danfe.comValorTotalDosProdutos(maskFields.maskNumber(json.cteProc?.CTe?.infCte.infCTeNorm?.infCarga?.vCarga?._text));
    danfe.comValorTotalDosServicos(maskFields.maskNumber(json.cteProc?.CTe?.infCte?.vPrest?.vTPrest?._text));
    danfe.comValorDoFrete(maskFields.maskNumber(json.cteProc?.CTe?.infCte?.vPrest?.vRec?._text));

    if (json.cteProc?.CTe?.infCte.infCTeNorm?.infDoc?.infNFe && Array.isArray(json.cteProc?.CTe?.infCte.infCTeNorm?.infDoc?.infNFe)) {
      json.cteProc?.CTe?.infCte.infCTeNorm?.infDoc?.infNFe.forEach((item: IinfNFe) => {
        danfe.adicionarItem(new Item().comCodigo(item.chave._text).comDescricao(String(item.chave._text).substring(22, 25) + "/" + String(item.chave._text).substring(25, 34)));
      });
    } else if (json.cteProc?.CTe?.infCte.infCTeNorm?.infDoc?.infNFe) {
      danfe.adicionarItem(
        new Item()
          .comCodigo(json.cteProc?.CTe?.infCte.infCTeNorm?.infDoc?.infNFe.chave._text)
          .comDescricao(
            String(json.cteProc?.CTe?.infCte.infCTeNorm?.infDoc?.infNFe.chave._text).substring(22, 25) +
              "/" +
              String(json.cteProc?.CTe?.infCte.infCTeNorm?.infDoc?.infNFe.chave._text).substring(25, 34)
          )
      );
    }

    new Gerador(danfe).gerarCTE(
      {
        ambiente: json.cteProc?.protCTe?.infProt.tpAmb._text == "2" ? "homologacao" : "producao",
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

export { JsonToCTE };
