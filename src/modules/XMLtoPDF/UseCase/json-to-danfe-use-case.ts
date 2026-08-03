import type {
	IinfProt,
	INfe,
	Icms_generico,
	Iduplicata,
} from "@/modules/interfaces/INfe";
import Danfe from "@/modules/pdf_generator/danfe-dacte/lib/danfe";
import Destinatario from "@/modules/pdf_generator/danfe-dacte/lib/destinatario";
import Duplicata from "@/modules/pdf_generator/danfe-dacte/lib/duplicata";
import Emitente from "@/modules/pdf_generator/danfe-dacte/lib/emitente";
import Endereco from "@/modules/pdf_generator/danfe-dacte/lib/endereco";
import Fatura from "@/modules/pdf_generator/danfe-dacte/lib/fatura";
import { gerarPdfEmBase64 } from "@/modules/pdf_generator/danfe-dacte/lib/gerarPdfEmBase64";
import Impostos from "@/modules/pdf_generator/danfe-dacte/lib/impostos";
import Item from "@/modules/pdf_generator/danfe-dacte/lib/item";
import Protocolo from "@/modules/pdf_generator/danfe-dacte/lib/protocolo";
import Transportador from "@/modules/pdf_generator/danfe-dacte/lib/transportador";
import Volumes from "@/modules/pdf_generator/danfe-dacte/lib/volumes";
import {
	cep,
	cnpj,
	data,
	hora,
	lista,
	maiusculas,
	numero,
	primeiro,
	texto,
} from "@/utils/campos-do-xml";

type InfNFe = NonNullable<INfe["nfeProc"]>["NFe"]["infNFe"];
type Det = InfNFe["det"];

class JsonToDanfe {
	find_ICMS_prod(imposto: Record<string, any>): Icms_generico {
		const tipoIcms = JSON.stringify(imposto)?.substring(2, 8);

		return {
			ICMS00: imposto?.ICMS00,
			ICMS10: imposto?.ICMS10,
			ICMS30: imposto?.ICMS30,
			ICMS40: imposto?.ICMS40,
			ICMS51: imposto?.ICMS51,
			ICMS60: imposto?.ICMS60,
			ICMS70: imposto?.ICMS70,
			ICMS90: imposto?.ICMS90,
			ICMS20: imposto?.ICMS20,
			ICMSSN: imposto?.ICMSSN ?? {
				...(imposto?.ICMSSN101 ??
					imposto?.ICMSSN102 ??
					imposto?.ICMSSN201 ??
					imposto?.ICMSSN202 ??
					imposto?.ICMSSN500 ??
					imposto?.ICMSSN900 ??
					imposto?.ICMSPart),
				CST:
					imposto?.ICMSSN102?.CSOSN ??
					imposto?.ICMSSN101?.CSOSN ??
					imposto?.ICMSSN102?.CSOSN ??
					imposto?.ICMSSN201?.CSOSN ??
					imposto?.ICMSSN202?.CSOSN ??
					imposto?.ICMSSN500?.CSOSN ??
					imposto?.ICMSSN900?.CSOSN ??
					imposto?.ICMSPart?.CST,
			},
		}[tipoIcms];
	}

	private montarEmitente(infNFe?: InfNFe): Emitente {
		const emit = infNFe?.emit;
		const ender = emit?.enderEmit;

		return new Emitente()
			.comNome(texto(emit?.xNome))
			.comRegistroNacional(cnpj(emit?.CNPJ))
			.comInscricaoEstadual(texto(emit?.IE))
			.comTelefone(texto(ender?.fone))
			.comEmail(texto(ender?.email))
			.comEndereco(
				new Endereco()
					.comLogradouro(texto(ender?.xLgr))
					.comNumero(`N°${texto(ender?.nro)}`)
					.comComplemento(texto(ender?.xCpl))
					.comCep(cep(ender?.CEP))
					.comBairro(texto(ender?.xBairro))
					.comMunicipio(texto(ender?.xMun))
					.comCidade(texto(ender?.xMun))
					.comUf(texto(ender?.UF)),
			);
	}

	private montarDestinatario(infNFe?: InfNFe): Destinatario {
		const dest = infNFe?.dest;
		const ender = dest?.enderDest;

		return new Destinatario()
			.comNome(texto(dest?.xNome))
			.comRegistroNacional(cnpj(dest?.CNPJ))
			.comInscricaoEstadual(texto(dest?.IE))
			.comTelefone(texto(ender?.fone))
			.comEndereco(
				new Endereco()
					.comLogradouro(texto(ender?.xLgr))
					.comNumero(texto(ender?.nro))
					// .comComplemento("complemento")
					.comCep(cep(ender?.CEP))
					.comBairro(texto(ender?.xBairro))
					.comMunicipio(texto(ender?.xMun))
					.comCidade(texto(ender?.xMun))
					.comUf(texto(ender?.UF)),
			);
	}

	private montarTransportador(infNFe?: InfNFe): Transportador {
		const transp = infNFe?.transp;
		const transporta = transp?.transporta;

		return (
			new Transportador()
				.comNome(texto(transporta?.xNome))
				.comRegistroNacional(cnpj(transporta?.CNPJ))
				.comInscricaoEstadual(texto(transporta?.IE))
				// .comCodigoAntt("")
				.comPlacaDoVeiculo(texto(transp?.veicTransp?.placa))
				.comUfDaPlacaDoVeiculo(texto(transp?.veicTransp?.UF))
				.comEndereco(
					new Endereco()
						.comLogradouro(texto(transporta?.xEnder))
						.comMunicipio(texto(transporta?.xMun))
						.comUf(texto(transporta?.UF)),
				)
		);
	}

	private montarProtocolo(prot?: IinfProt): Protocolo {
		return new Protocolo()
			.comData(data(prot?.dhRecbto))
			.comCodigo(texto(prot?.nProt));
	}

	private montarImpostos(infNFe?: InfNFe): Impostos {
		const totais = infNFe?.total?.ICMSTot;

		return new Impostos()
			.comBaseDeCalculoDoIcms(numero(totais?.vBC))
			.comValorDoIcms(numero(totais?.vICMS))
			.comBaseDeCalculoDoIcmsSt(numero(totais?.vBCST))
			.comValorDoIcmsSt(numero(totais?.vST))
			.comValorDoImpostoDeImportacao(numero(totais?.vII))
			.comValorDoPis(numero(totais?.vPIS))
			.comValorTotalDoIpi(numero(totais?.vIPI))
			.comValorDaCofins(numero(totais?.vCOFINS))
			.comValorTotTrib(numero(totais?.vTotTrib))
			.comValorFCP(numero(totais?.vFCP))
			.comValorICMSufRemet(numero(totais?.vICMSUFRemet))
			.comValorICMSufDest(numero(totais?.vICMSUFDest))
			.comBaseDeCalculoDoIssqn("")
			.comValorTotalDoIssqn("");
	}

	private montarVolumes(infNFe?: InfNFe): Volumes {
		const vol = infNFe?.transp?.vol;

		return new Volumes()
			.comQuantidade(numero(vol?.qVol))
			.comEspecie(texto(vol?.esp))
			.comMarca(texto(vol?.marca))
			.comPesoBruto(numero(vol?.pesoB))
			.comPesoLiquido(numero(vol?.pesoL));
	}

	private montarFatura(infNFe?: InfNFe): Fatura {
		const fat = infNFe?.cobr?.fat;

		if (!fat) {
			return new Fatura();
		}

		return new Fatura()
			.comNumero(texto(fat.nFat))
			.comValorOriginal(numero(fat.vOrig))
			.comValorDoDesconto(numero(fat.vDesc))
			.comValorLiquido(numero(fat.vLiq))
			.comFormaDePagamento(texto(infNFe?.pag?.detPag?.indPag));
	}

	private montarDuplicatas(infNFe?: InfNFe): Duplicata[] {
		return lista<Iduplicata>(infNFe?.cobr?.dup).map((duplicata) =>
			new Duplicata()
				.comNumero(texto(duplicata?.nDup))
				.comVencimento(data(duplicata?.dVenc))
				.comValor(numero(duplicata?.vDup)),
		);
	}

	private montarItens(infNFe?: InfNFe): Item[] {
		return lista<Det>(infNFe?.det).map((det) => {
			const icms = this.find_ICMS_prod(det.imposto?.ICMS || det.imposto?.ICMSSN);
			const ipi = det.imposto?.IPI?.IPITrib;

			return new Item()
				.comCodigo(texto(det.prod?.cProd))
				.comDescricao(texto(det.prod?.xProd))
				.comNcmSh(texto(det.prod?.NCM))
				.comOCst(`${texto(icms?.orig)}${texto(icms?.CST)}`)
				.comCfop(texto(det.prod?.CFOP))
				.comUnidade(maiusculas(det.prod?.uCom))
				.comQuantidade(numero(det.prod?.qCom))
				.comValorUnitario(numero(det.prod?.vUnCom))
				.comValorTotal(numero(det.prod?.vProd))
				.comBaseDeCalculoDoIcms(numero(icms?.vBC))
				.comValorDoIcms(numero(icms?.vICMS))
				.comValorDoIpi(numero(ipi?.vIPI))
				.comAliquotaDoIcms(numero(icms?.pICMS))
				.comAliquotaDoIpi(numero(ipi?.pIPI));
		});
	}

	jsonToPDF(json: INfe): Promise<string> {
		const infNFe = json.nfeProc?.NFe?.infNFe;
		const prot = json.nfeProc?.protNFe?.infProt;
		const ide = infNFe?.ide;
		const totais = infNFe?.total?.ICMSTot;
		const infAdic = infNFe?.infAdic;

		const danfe = new Danfe()
			.comChaveDeAcesso(texto(prot?.chNFe))
			.comEmitente(this.montarEmitente(infNFe))
			.comDestinatario(this.montarDestinatario(infNFe))
			.comTransportador(this.montarTransportador(infNFe))
			.comProtocolo(this.montarProtocolo(prot))
			.comImpostos(this.montarImpostos(infNFe))
			.comVolumes(this.montarVolumes(infNFe))
			.comFatura(this.montarFatura(infNFe))
			.comDuplicatas(this.montarDuplicatas(infNFe))
			.comItens(this.montarItens(infNFe))
			.comTipo(texto(ide?.tpNF))
			.comNaturezaDaOperacao(texto(ide?.natOp))
			.comNumero(texto(ide?.nNF))
			.comSerie(texto(ide?.serie))
			.comModalidadeDoFrete(texto(infNFe?.transp?.modFrete))
			.comInscricaoEstadualDoSubstitutoTributario(texto(infNFe?.emit?.IEST))
			.comValorTotalDaNota(numero(totais?.vNF))
			.comValorTotalDosProdutos(numero(totais?.vProd))
			.comValorTotalDosServicos(numero(totais?.vServ))
			.comValorDoFrete(numero(totais?.vFrete))
			.comValorDoSeguro(numero(totais?.vSeg))
			.comDesconto(numero(totais?.vDesc))
			.comOutrasDespesas(numero(totais?.vOutro));

		// NOTE: legacy preserved — os template literals transformam a ausência do
		// campo na string "undefined", que é truthy; na prática só o primeiro
		// operando do `||` decide. Mantido para não alterar o PDF gerado.
		danfe.comInformacoesComplementares(
			texto(infAdic?.infAdFisco) ||
				`${texto(infAdic?.infCpl)}` ||
				`${texto(infAdic?.obsCont)}` ||
				`${texto(infAdic?.obsFisco)}` ||
				`${texto(infAdic?.procRef)}` ||
				"",
		);

		// A NF-e traz a emissão em `dhEmi` (layout 4.00) ou `dEmi` (layout antigo).
		const emissao = primeiro(ide?.dhEmi, ide?.dEmi);
		if (emissao) {
			danfe.comDataDaEmissao(data(emissao));
		}

		if (texto(ide?.dhSaiEnt)) {
			danfe
				.comDataDaEntradaOuSaida(data(ide?.dhSaiEnt))
				.comHorarioEntradaSaida(hora(ide?.dhSaiEnt));
		}

		return gerarPdfEmBase64(danfe, "danfe", texto(prot?.tpAmb));
	}
}

export { JsonToDanfe };
