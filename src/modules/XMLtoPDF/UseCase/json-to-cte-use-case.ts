import type { IDaCte, IinfNFe } from "@/modules/interfaces/IDaCte";
import type { Icms_generico } from "@/modules/interfaces/IDaCte";
import type { IinfProt } from "@/modules/interfaces/INfe";
import CteInfo from "@/modules/pdf_generator/danfe-dacte/lib/cteInfo";
import Danfe from "@/modules/pdf_generator/danfe-dacte/lib/danfe";
import Destinatario from "@/modules/pdf_generator/danfe-dacte/lib/destinatario";
import Emitente from "@/modules/pdf_generator/danfe-dacte/lib/emitente";
import Endereco from "@/modules/pdf_generator/danfe-dacte/lib/endereco";
import Expeditor from "@/modules/pdf_generator/danfe-dacte/lib/expeditor";
import { gerarPdfEmBase64 } from "@/modules/pdf_generator/danfe-dacte/lib/gerarPdfEmBase64";
import Impostos from "@/modules/pdf_generator/danfe-dacte/lib/impostos";
import Item from "@/modules/pdf_generator/danfe-dacte/lib/item";
import Protocolo from "@/modules/pdf_generator/danfe-dacte/lib/protocolo";
import Recebedor from "@/modules/pdf_generator/danfe-dacte/lib/recebedor";
import Transportador from "@/modules/pdf_generator/danfe-dacte/lib/transportador";
import {
	cep,
	cnpj,
	data,
	dataHora,
	lista,
	maiusculas,
	numero,
	primeiro,
	texto,
} from "@/utils/campos-do-xml";

type InfCte = NonNullable<NonNullable<IDaCte["cteProc"]>["CTe"]>["infCte"];

class JsonToCTE {
	returnICMS(imposto: any): Icms_generico | null {
		const tipoIcms = JSON.stringify(imposto).substring(2, 8);

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
			for (const item of obs2) {
				result += ` ${item.xTexto._text}`;
			}
		} else if (obs2) {
			result += obs2.xTexto._text;
		}

		return result;
	}

	private montarCteInfo(infCte?: InfCte): CteInfo {
		const ide = infCte?.ide;
		const norm = infCte?.infCTeNorm;
		const rodo = norm?.infModal?.rodo;

		return new CteInfo()
			.comTpCte(texto(ide?.tpCTe))
			.comTpServ(texto(ide?.tpServ))
			// Sem `toma3` o tomador é o "outros" (código 4).
			.comToma(texto(ide?.toma3?.toma) || "4")
			.comModalFrete(texto(ide?.modal))
			.comCfopFrete(`${texto(ide?.CFOP)} - ${texto(ide?.natOp)}`)
			.comInicioPrestacao(
				`${texto(ide?.xMunIni)} - ${texto(ide?.UFIni)}`.toUpperCase(),
			)
			.comFinalDaPrestacao(
				`${texto(ide?.xMunFim)} - ${texto(ide?.UFFim)}`.toUpperCase(),
			)
			.comModelo(texto(ide?.mod))
			.comProdPred(texto(norm?.infCarga?.proPred))
			.comCarga(norm?.infCarga?.infQ)
			.comObservacao(
				this.montaObservacao(
					texto(infCte?.compl?.xObs),
					infCte?.compl?.ObsCont,
				),
			)
			.comRNTRC(texto(rodo?.RNTRC))
			.comCIOT(texto(rodo?.CIOT))
			.comDataEntrega(data(rodo?.dPrev))
			.comOutrasCaracCarga(texto(norm?.infCarga?.xOutCat))
			.comComponenteServico(infCte?.vPrest?.Comp);
	}

	private montarRecebedor(infCte?: InfCte): Recebedor {
		const receb = infCte?.receb;
		const ender = receb?.enderReceb;

		return new Recebedor()
			.comNome(texto(receb?.xNome))
			.comRegistroNacional(cnpj(receb?.CNPJ))
			.comInscricaoEstadual(texto(receb?.IE))
			.comTelefone(texto(receb?.fone))
			.comEmail("")
			.comEndereco(
				new Endereco()
					.comLogradouro(texto(ender?.xLgr))
					.comNumero(texto(ender?.nro))
					.comComplemento(texto(ender?.xCpl))
					.comCep(cep(ender?.CEP))
					.comBairro(texto(ender?.xBairro))
					.comMunicipio(texto(ender?.xMun))
					.comCidade(texto(ender?.xMun))
					.comUf(texto(ender?.UF))
					.comPais(texto(ender?.xPais)),
			);
	}

	private montarExpeditor(infCte?: InfCte): Expeditor {
		const exped = infCte?.exped;
		const ender = exped?.enderExped;

		return new Expeditor()
			.comNome(texto(exped?.xNome))
			.comRegistroNacional(cnpj(exped?.CNPJ))
			.comInscricaoEstadual(texto(exped?.IE))
			.comTelefone(texto(exped?.fone))
			.comEmail("")
			.comEndereco(
				new Endereco()
					.comLogradouro(texto(ender?.xLgr))
					.comNumero(texto(ender?.nro))
					.comComplemento(texto(ender?.xCpl))
					.comCep(cep(ender?.CEP))
					.comBairro(texto(ender?.xBairro))
					.comMunicipio(texto(ender?.xMun))
					.comCidade(texto(ender?.xMun))
					.comUf(texto(ender?.UF))
					.comPais(texto(ender?.xPais)),
			);
	}

	private montarEmitente(infCte?: InfCte): Emitente {
		const emit = infCte?.emit;
		const ender = emit?.enderEmit;

		return new Emitente()
			.comNome(texto(emit?.xNome))
			.comRegistroNacional(cnpj(emit?.CNPJ))
			.comInscricaoEstadual(texto(emit?.IE))
			.comTelefone(texto(ender?.fone))
			.comEmail("")
			.comEndereco(
				new Endereco()
					.comLogradouro(texto(ender?.xLgr))
					.comNumero(texto(ender?.nro))
					.comComplemento(texto(ender?.xCpl))
					.comCep(cep(ender?.CEP))
					.comBairro(texto(ender?.xBairro))
					.comMunicipio(maiusculas(ender?.xMun))
					.comCidade(texto(ender?.xMun))
					.comUf(texto(ender?.UF))
					.comPais(texto(ender?.xPais)),
			);
	}

	private montarDestinatario(infCte?: InfCte): Destinatario {
		const dest = infCte?.dest;
		const ender = dest?.enderDest;

		return new Destinatario()
			.comNome(texto(dest?.xNome))
			.comRegistroNacional(cnpj(dest?.CNPJ))
			.comTelefone(texto(dest?.fone))
			.comInscricaoEstadual(texto(dest?.IE))
			.comEndereco(
				new Endereco()
					.comLogradouro(texto(ender?.xLgr))
					.comNumero(texto(ender?.nro))
					.comCep(cep(ender?.CEP))
					.comBairro(texto(ender?.xBairro))
					.comMunicipio(maiusculas(ender?.xMun))
					.comCidade(texto(ender?.xMun))
					.comUf(texto(ender?.UF))
					.comPais(texto(ender?.xPais)),
			);
	}

	/** No DACTE o remetente (`rem`) ocupa o quadro do transportador. */
	private montarRemetente(infCte?: InfCte): Transportador {
		const rem = infCte?.rem;
		const ender = rem?.enderReme;

		return new Transportador()
			.comNome(texto(rem?.xNome))
			.comRegistroNacional(cnpj(rem?.CNPJ))
			.comInscricaoEstadual(texto(rem?.IE))
			.comTelefone(texto(rem?.fone))
			.comEndereco(
				new Endereco()
					.comLogradouro(texto(ender?.xLgr))
					.comNumero(texto(ender?.nro))
					.comCep(cep(ender?.CEP))
					.comBairro(texto(ender?.xBairro))
					.comMunicipio(maiusculas(ender?.xMun))
					.comCidade(texto(ender?.xMun))
					.comUf(texto(ender?.UF))
					.comPais(texto(ender?.xPais)),
			);
	}

	private montarProtocolo(prot?: IinfProt): Protocolo {
		return new Protocolo()
			.comCodigo(texto(prot?.nProt))
			.comData(data(prot?.dhRecbto));
	}

	private montarImpostos(infCte?: InfCte): Impostos {
		const icms = this.returnICMS(infCte?.imp?.ICMS);

		return (
			new Impostos()
				.comBaseDeCalculoDoIcms(
					numero(primeiro(icms?.vBC, icms?.vBCSTRet, icms?.vBCOutraUF)),
				)
				.comValorDoIcms(numero(primeiro(icms?.vICMS, icms?.vICMSOutraUF)))
				.comValorDoIcmsSt(numero(icms?.vICMSSTRet))
				// NOTE: legacy preserved — o DACTE reaproveita campos do DANFE: CST vai
				// no lugar do PIS, a alíquota do ICMS no do IPI e a redução no COFINS.
				.comValorDoPis(texto(icms?.CST))
				.comValorTotalDoIpi(numero(primeiro(icms?.pICMS, icms?.pICMSOutraUF)))
				.comValorDaCofins(numero(infCte?.imp?.pRedBC))
		);
	}

	private montarDocumentos(infCte?: InfCte): Item[] {
		return lista<IinfNFe>(infCte?.infCTeNorm?.infDoc?.infNFe).map((nfe) => {
			const chave = String(texto(nfe.chave));

			return new Item()
				.comCodigo(texto(nfe.chave))
				.comDescricao(`${chave.substring(22, 25)}/${chave.substring(25, 34)}`);
		});
	}

	jsonToPDF(json: IDaCte): Promise<string> {
		const infCte = json.cteProc?.CTe?.infCte;
		const prot = json.cteProc?.protCTe?.infProt;
		const ide = infCte?.ide;

		const danfe = new Danfe()
			.comChaveDeAcesso(texto(prot?.chCTe))
			.comEmitente(this.montarEmitente(infCte))
			.comDestinatario(this.montarDestinatario(infCte))
			.comTransportador(this.montarRemetente(infCte))
			.comCteInfo(this.montarCteInfo(infCte))
			.comRecebedor(this.montarRecebedor(infCte))
			.comExpeditor(this.montarExpeditor(infCte))
			.comProtocolo(this.montarProtocolo(prot))
			.comImpostos(this.montarImpostos(infCte))
			.comItens(this.montarDocumentos(infCte))
			.comTipo("saida")
			.comNaturezaDaOperacao(texto(ide?.natOp))
			.comNumero(texto(ide?.nCT))
			.comSerie(texto(ide?.serie))
			.comDataDaEmissao(dataHora(ide?.dhEmi))
			.comDataDaEntradaOuSaida(data(prot?.dhRecbto))
			.comModalidadeDoFrete(texto(ide?.modal))
			.comInscricaoEstadualDoSubstitutoTributario("")
			.comInformacoesComplementares("")
			.comValorTotalDosProdutos(numero(infCte?.infCTeNorm?.infCarga?.vCarga))
			.comValorTotalDosServicos(numero(infCte?.vPrest?.vTPrest))
			.comValorDoFrete(numero(infCte?.vPrest?.vRec));

		return gerarPdfEmBase64(danfe, "cte", texto(prot?.tpAmb));
	}
}

export { JsonToCTE };
