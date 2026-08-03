import type { ICteOS } from "@/modules/interfaces/ICteOS";
import type { IinfProt } from "@/modules/interfaces/INfe";
import CteInfo from "@/modules/pdf_generator/danfe-dacte/lib/cteInfo";
import Danfe from "@/modules/pdf_generator/danfe-dacte/lib/danfe";
import Destinatario from "@/modules/pdf_generator/danfe-dacte/lib/destinatario";
import Emitente from "@/modules/pdf_generator/danfe-dacte/lib/emitente";
import Endereco from "@/modules/pdf_generator/danfe-dacte/lib/endereco";
import { gerarPdfEmBase64 } from "@/modules/pdf_generator/danfe-dacte/lib/gerarPdfEmBase64";
import Protocolo from "@/modules/pdf_generator/danfe-dacte/lib/protocolo";
import { cep, cnpj, data, dataHora, texto } from "@/utils/campos-do-xml";

type InfCteOS = NonNullable<
	NonNullable<ICteOS["cteOSProc"]>["CTeOS"]
>["infCte"];

/**
 * DACTE-OS (modelo 67) generator.
 *
 * ⚠️ SCAFFOLD — WORK IN PROGRESS.
 *
 * The legacy PDF layout (`gerarCTEOS`) is ready and this use-case is wired to
 * it, but the XML → model mapping below only covers the fields that are
 * structurally shared with the ordinary CT-e (modelo 57). The blocks marked
 * `TODO(model-67)` still need to be filled in and validated against a real
 * model-67 XML sample before this path can be considered complete.
 *
 * Until then the route is reachable (detection + dispatch are in place) so the
 * remaining work is purely the field mapping.
 */
class JsonToCTEOS {
	/** Emitente — estrutura idêntica à do modelo 57. */
	private montarEmitente(infCte?: InfCteOS): Emitente {
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
					.comMunicipio(texto(ender?.xMun))
					.comCidade(texto(ender?.xMun))
					.comUf(texto(ender?.UF)),
			);
	}

	/**
	 * TODO(model-67): o CT-e OS traz um único bloco `toma` de tomador, com
	 * formato diferente do modelo 57. Mapear explicitamente quando houver um
	 * XML de exemplo; por ora reaproveitamos `dest` quando presente.
	 */
	private montarDestinatario(infCte?: InfCteOS): Destinatario {
		const dest = infCte?.dest;

		return new Destinatario()
			.comNome(texto(dest?.xNome))
			.comRegistroNacional(cnpj(dest?.CNPJ))
			.comInscricaoEstadual(texto(dest?.IE))
			.comEndereco(new Endereco());
	}

	private montarProtocolo(prot?: IinfProt): Protocolo {
		return new Protocolo()
			.comCodigo(texto(prot?.nProt))
			.comData(data(prot?.dhRecbto));
	}

	private montarCteInfo(infCte?: InfCteOS): CteInfo {
		const ide = infCte?.ide;

		return new CteInfo()
			.comModelo(texto(ide?.mod))
			.comCfopFrete(`${texto(ide?.CFOP) ?? ""} - ${texto(ide?.natOp) ?? ""}`);
	}

	jsonToPDF(json: ICteOS): Promise<string> {
		const infCte = json.cteOSProc?.CTeOS?.infCte;
		const prot = json.cteOSProc?.protCTe?.infProt;

		if (!infCte) {
			throw new Error(
				"CT-e OS (modelo 67) inválido: nó cteOSProc/CTeOS/infCte ausente.",
			);
		}

		const ide = infCte.ide;

		// TODO(model-67): map impostos, componentes do serviço (vPrest/Comp),
		// documentos/itens (infCTeNorm), expeditor/recebedor and observações,
		// mirroring json-to-cte-use-case but against the model-67 structure.
		const danfe = new Danfe()
			.comChaveDeAcesso(texto(prot?.chCTe))
			.comEmitente(this.montarEmitente(infCte))
			.comDestinatario(this.montarDestinatario(infCte))
			.comCteInfo(this.montarCteInfo(infCte))
			.comProtocolo(this.montarProtocolo(prot))
			.comTipo("saida")
			.comNaturezaDaOperacao(texto(ide?.natOp))
			.comNumero(texto(ide?.nCT))
			.comSerie(texto(ide?.serie))
			.comDataDaEmissao(dataHora(ide?.dhEmi));

		return gerarPdfEmBase64(danfe, "cteos", texto(prot?.tpAmb));
	}
}

export { JsonToCTEOS };
