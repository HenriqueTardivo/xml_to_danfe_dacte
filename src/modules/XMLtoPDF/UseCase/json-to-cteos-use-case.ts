import type { ICteOS } from "@/modules/interfaces/ICteOS";
import CteInfo from "@/modules/pdf_generator/danfe-dacte/lib/cteInfo";
import Danfe from "@/modules/pdf_generator/danfe-dacte/lib/danfe";
import Destinatario from "@/modules/pdf_generator/danfe-dacte/lib/destinatario";
import Emitente from "@/modules/pdf_generator/danfe-dacte/lib/emitente";
import Endereco from "@/modules/pdf_generator/danfe-dacte/lib/endereco";
import Gerador from "@/modules/pdf_generator/danfe-dacte/lib/gerador";
import Protocolo from "@/modules/pdf_generator/danfe-dacte/lib/protocolo";
import { MaskFields } from "@/utils/MaskFields";

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
	async jsonToPDF(json: ICteOS): Promise<string> {
		const infCte = json.cteOSProc?.CTeOS?.infCte;
		const prot = json.cteOSProc?.protCTe?.infProt;

		if (!infCte) {
			throw new Error(
				"CT-e OS (modelo 67) inválido: nó cteOSProc/CTeOS/infCte ausente.",
			);
		}

		const maskFields = new MaskFields();
		let pdfBase64 = "";

		// --- Emitente (shared with modelo 57) -----------------------------------
		const emitente = new Emitente();
		emitente.comNome(infCte.emit?.xNome?._text);
		emitente.comRegistroNacional(maskFields.maskCnpj(infCte.emit?.CNPJ?._text));
		emitente.comInscricaoEstadual(infCte.emit?.IE?._text);
		emitente.comTelefone(infCte.emit?.enderEmit?.fone?._text);
		emitente.comEmail("");
		emitente.comEndereco(
			new Endereco()
				.comLogradouro(infCte.emit?.enderEmit?.xLgr?._text)
				.comNumero(infCte.emit?.enderEmit?.nro?._text)
				.comComplemento(infCte.emit?.enderEmit?.xCpl?._text)
				.comCep(maskFields.maskCEP(infCte.emit?.enderEmit?.CEP?._text))
				.comBairro(infCte.emit?.enderEmit?.xBairro?._text)
				.comMunicipio(infCte.emit?.enderEmit?.xMun?._text)
				.comCidade(infCte.emit?.enderEmit?.xMun?._text)
				.comUf(infCte.emit?.enderEmit?.UF?._text),
		);

		// --- Tomador / Destinatário --------------------------------------------
		// TODO(model-67): CT-e OS carries a single "toma" tomador block whose
		// shape differs from the modelo 57. Map it explicitly once a sample is
		// available; for now we reuse `dest` when present.
		const destinatario = new Destinatario();
		destinatario.comNome(infCte.dest?.xNome?._text);
		destinatario.comRegistroNacional(
			maskFields.maskCnpj(infCte.dest?.CNPJ?._text),
		);
		destinatario.comInscricaoEstadual(infCte.dest?.IE?._text);
		destinatario.comEndereco(new Endereco());

		// --- Protocolo (shared) -------------------------------------------------
		const protocolo = new Protocolo();
		protocolo.comCodigo(prot?.nProt?._text);
		protocolo.comData(maskFields.maskDate(prot?.dhRecbto?._text));

		// --- Cabeçalho do CT-e --------------------------------------------------
		const cteInfo = new CteInfo();
		cteInfo.comModelo(infCte.ide?.mod?._text);
		cteInfo.comCfopFrete(
			`${infCte.ide?.CFOP?._text ?? ""} - ${infCte.ide?.natOp?._text ?? ""}`,
		);

		const danfe = new Danfe();
		danfe.comChaveDeAcesso(prot?.chCTe?._text);
		danfe.comEmitente(emitente);
		danfe.comDestinatario(destinatario);
		danfe.comCteInfo(cteInfo);
		danfe.comProtocolo(protocolo);
		danfe.comTipo("saida");
		danfe.comNaturezaDaOperacao(infCte.ide?.natOp?._text);
		danfe.comNumero(infCte.ide?.nCT?._text);
		danfe.comSerie(infCte.ide?.serie?._text);
		danfe.comDataDaEmissao(maskFields.maskDateTime(infCte.ide?.dhEmi?._text));

		// TODO(model-67): map impostos, componentes do serviço (vPrest/Comp),
		// documentos/itens (infCTeNorm), expeditor/recebedor and observações,
		// mirroring json-to-cte-use-case but against the model-67 structure.

		new Gerador(danfe).gerarCTEOS(
			{
				ambiente: prot?.tpAmb?._text === "2" ? "homologacao" : "producao",
				ajusteYDoLogotipo: -4,
				ajusteYDaIdentificacaoDoEmitente: 4,
				creditos: "",
			},
			(err: Error, pdf: PDFKit.PDFDocument) => {
				if (err) throw err;

				const chunks: Buffer[] = [];
				pdf.on("data", (chunk: Buffer) => chunks.push(chunk));
				pdf.on("end", () => {
					pdfBase64 = Buffer.concat(chunks).toString("base64");
				});
			},
		);

		return new Promise((resolve) => setTimeout(() => resolve(pdfBase64)));
	}
}

export { JsonToCTEOS };
