import path from "node:path";
import Pdf from "pdfkit";
import type Danfe from "@/modules/pdf_generator/danfe-dacte/lib/danfe";
import type { GeradorCallback } from "@/modules/pdf_generator/danfe-dacte/lib/gerador";
import type Pessoa from "@/modules/pdf_generator/danfe-dacte/lib/pessoa";

// biome-ignore lint/suspicious/noExplicitAny: layout option bag / text content
type Any = any;

const diretorioDeFontes = path.join(__dirname, "./fontes");
const timesNewRoman = path.join(diretorioDeFontes, "Times New Roman.ttf");
const timesNewRomanNegrito = path.join(
	diretorioDeFontes,
	"Times New Roman Bold.ttf",
);
const timesNewRomanItalico = path.join(
	diretorioDeFontes,
	"Times New Roman Italic.ttf",
);
const timesNewRomanNegritoItalico = path.join(
	diretorioDeFontes,
	"Times New Roman Bold Italic.ttf",
);
const barcode = path.join(diretorioDeFontes, "code128.ttf");

const pdfDefaults = {
	ajusteY: 0,
	ajusteX: 0,
	autor: "",
	titulo: "",
	criador: "",

	tamanhoDaFonteDoTitulo: 6,
	corDoTitulo: "black",
	alinhamentoDoTitulo: "left",
	alinhamentoDoTituloDaTabela: "center",

	tamanhoDaFonteDaSecao: 7,
	corDaSecao: "black",

	tamanhoDaFonteDoCampo: 9.5,
	alinhamentoDoCampo: "center",
	corDoCampo: "black",

	ajusteYDoLogotipo: 0,
	ajusteYDaIdentificacaoDoEmitente: 0,

	ambiente: "producao",
	opacidadeDaHomologacao: 0.2,
	ajusteYDaHomologacao: 275,

	tamanhoDoCodigoDeBarras: 32,
	corDoLayout: "black",
	larguraDaPagina: 595.28,
	alturaDaPagina: 841.89,
	creditos: "Desenvolvido por Romagnole",
};

export default (dacte: Danfe, argsInput: Any, callback: GeradorCallback) => {
	let args: Any = argsInput;
	if (typeof args === "function") {
		callback = args;
		args = pdfDefaults;
	}

	// NOTE: the legacy source called an undefined `merge(pdfDefaults, args)`,
	// which threw at runtime and meant this path never worked. Replaced with the
	// same spread-merge used by the sibling generators (its evident intent).
	args = { ...pdfDefaults, ...args };

	const emitente = dacte.getEmitente();
	const impostos = dacte.getImpostos();
	const protocolo = dacte.getProtocolo();
	const itens = dacte.getItens();
	const cteInfo = dacte.getCteInfo();
	const pdf = new Pdf({
		pdfVersion: "1.7",
		bufferPages: true,
		margin: 0,
		size: [args.larguraDaPagina, args.alturaDaPagina],
	});
	if (args.stream) {
		pdf.pipe(args.stream);
	}

	pdf.registerFont("normal", timesNewRoman);
	pdf.registerFont("negrito", timesNewRomanNegrito);
	pdf.registerFont("italico", timesNewRomanItalico);
	pdf.registerFont("negrito-italico", timesNewRomanNegritoItalico);
	pdf.registerFont("codigoDeBarras", barcode);

	function TomadorDeServico(toma: string | undefined): Pessoa | "" {
		const mapa: Record<string, Pessoa> = {
			0: dacte._transportador, //remetente
			1: dacte._expeditor,
			2: dacte._recebedor,
			3: dacte._destinatario,
		};
		return mapa[toma as string] || "";
	}

	///////// LAYOUT
	const grossuraDaLinha = 0.5;
	const margemTopo = 2.8;
	const margemEsquerda = 3;
	const margemDireita = 589.65;
	const larguraDoFormulario = margemDireita - margemEsquerda;

	pdf.lineWidth(grossuraDaLinha);

	function linhaHorizontal(x1: number, x2: number, y: number, cor?: string) {
		y = margemTopo + args.ajusteY + y;
		x1 = margemEsquerda + args.ajusteX + x1;
		x2 = margemDireita + args.ajusteX + x2;

		return pdf
			.moveTo(x1, y)
			.lineTo(x2, y)
			.stroke(cor || args.corDoLayout);
	}

	function linhaVertical(y1: number, y2: number, x: number, cor?: string) {
		x = margemEsquerda + args.ajusteX + x;
		y1 = margemTopo + args.ajusteY + y1;
		y2 = margemTopo + args.ajusteY + y2;

		return pdf
			.moveTo(x, y1)
			.lineTo(x, y2)
			.stroke(cor || args.corDoLayout);
	}
	function titulo(
		string: Any,
		x: number,
		y: number,
		largura?: Any,
		alinhamento?: Any,
		tamanho?: number,
	) {
		string =
			(typeof string !== "undefined" && string !== null && string.toString()) ||
			"";

		x = margemEsquerda + args.ajusteX + x;
		y = margemTopo + args.ajusteY + y;

		pdf
			.font("normal")
			.fillColor(args.corDoTitulo)
			.fontSize(tamanho || args.tamanhoDaFonteDoTitulo)
			.text(string.toUpperCase(), x, y, {
				width: largura,
				align: alinhamento || args.alinhamentoDoTitulo,
			});
	}

	function normal(
		string: Any,
		x: number,
		y: number,
		largura?: Any,
		alinhamento?: Any,
		tamanho?: number,
		_pdf?: PDFKit.PDFDocument,
	) {
		string = string || "";

		(_pdf || pdf)
			.font("normal")
			.fillColor(args.corDoTitulo)
			.fontSize(tamanho || 8)
			.text(
				string,
				margemEsquerda + args.ajusteX + x,
				margemTopo + args.ajusteY + y,
				{
					width: largura,
					align: alinhamento || "center",
					lineGap: -1.5,
				},
			);
	}

	function italico(
		string: Any,
		x: number,
		y: number,
		largura?: Any,
		alinhamento?: Any,
		tamanho?: number,
	) {
		string = string || "";

		pdf
			.font("italico")
			.fillColor(args.corDoTitulo)
			.fontSize(tamanho || 6)
			.text(
				string,
				margemEsquerda + args.ajusteX + x,
				margemTopo + args.ajusteY + y,
				{
					width: largura,
					align: alinhamento || "center",
					lineGap: -1.5,
				},
			);
	}

	function negrito(
		string: Any,
		x: number,
		y: number,
		largura?: Any,
		alinhamento?: Any,
		tamanho?: number,
	) {
		string = string || "";

		pdf
			.font("negrito")
			.fillColor(args.corDoTitulo)
			.fontSize(tamanho || 6)
			.text(
				string,
				margemEsquerda + args.ajusteX + x,
				margemTopo + args.ajusteY + y,
				{
					width: largura,
					align: alinhamento || "center",
					lineGap: -1.5,
				},
			);
	}

	function campo(
		string: Any,
		x: number,
		y: number,
		largura?: Any,
		alinhamento?: Any,
		tamanho?: number,
	) {
		string = string || "";

		pdf
			.font("negrito")
			.fillColor(args.corDoCampo)
			.fontSize(tamanho || args.tamanhoDaFonteDoCampo)
			.text(
				string,
				margemEsquerda + args.ajusteX + x,
				margemTopo + args.ajusteY + y,
				{
					width: largura,
					align: alinhamento || args.alinhamentoDoCampo,
				},
			);
	}

	function desenharPagina() {
		if (args.ambiente !== "producao") {
			pdf
				.font("normal")
				.fillColor(args.corDoTitulo)
				.fontSize(50)
				.fillOpacity(args.opacidadeDaHomologacao)
				.text(
					"HOMOLOGAÇÃO",
					margemEsquerda + args.ajusteX + 0,
					margemTopo + args.ajusteY + 400 + args.ajusteYDaHomologacao,
					{
						width: larguraDoFormulario,
						align: "center",
					},
				);

			pdf
				.font("normal")
				.fillColor(args.corDoTitulo)
				.fontSize(25)
				.fillOpacity(args.opacidadeDaHomologacao)
				.text(
					"SEM VALOR FISCAL",
					margemEsquerda + args.ajusteX + 0,
					margemTopo + args.ajusteY + 450 + args.ajusteYDaHomologacao,
					{
						width: larguraDoFormulario,
						align: "center",
					},
				);
		}

		//RECIBO
		linhaHorizontal(0, 0, 0);
		linhaHorizontal(0, 0, 12);
		linhaHorizontal(0, -450, 30);

		linhaHorizontal(300, -92.75, 30);

		linhaHorizontal(0, 0, 51.1);
		linhaVertical(0, 51.1, 0);
		linhaVertical(12, 51.1, 137);
		linhaVertical(12, 51.1, 300);
		linhaVertical(12, 51.1, 494);
		linhaVertical(0, 51.1, larguraDoFormulario);

		//PRIMEIRO BLOCO
		linhaHorizontal(0, 0, 59.55);
		linhaHorizontal(241, 0, 90);
		linhaHorizontal(241, 0, 112);
		linhaHorizontal(0, 0, 150.2);
		linhaHorizontal(0, 0, 170);
		linhaVertical(59.55, 833, 0); //borda esquerda
		linhaVertical(59.55, 202, 240.75);
		linhaVertical(59.55, 90, 440); //aqui
		linhaVertical(59.55, 230, larguraDoFormulario);
		linhaVertical(90, 112, 290);

		linhaVertical(221, 201, 240.75);

		linhaVertical(90, 112, 340);
		linhaVertical(90, 112, 400);
		linhaVertical(90, 112, 440);
		linhaVertical(90, 112, 515);
		linhaVertical(170, 150, 120);
		linhaVertical(200, 833, larguraDoFormulario); //borda direita

		//SEGUNDO BLOCO
		//    linhaHorizontal(0, 0, 201.2);
		linhaHorizontal(0, 0, 221);
		linhaHorizontal(0, 0, 241);
		linhaVertical(201.2, 261, 0);
		linhaVertical(221, 241, 195);
		linhaVertical(221, 241, 377);
		linhaHorizontal(241, 0, 200);
		linhaVertical(201.2, 261, larguraDoFormulario);

		//QUARTO BLOCO
		linhaHorizontal(0, 0, 256);
		linhaHorizontal(0, 0, 287);

		//QUINTO BLOCO /
		linhaHorizontal(0, 0, 303);

		//SEXTO BLOCO
		linhaHorizontal(0, 0, 435);
		linhaVertical(303, 435, 120);
		linhaHorizontal(0, 0, 327);

		//SEXTO BLOCO
		linhaHorizontal(0, 0, 454);
		linhaVertical(454, 545, 120);
		linhaVertical(454, 545, 241);
		linhaVertical(454, 545, 360);
		linhaHorizontal(360, 0, 500);
		linhaHorizontal(0, 0, 545);

		//SETIMO BLOCO
		linhaHorizontal(0, 0, 564);
		linhaVertical(587, 564, 196);
		linhaVertical(587, 564, 298);
		linhaVertical(587, 564, 347);
		linhaVertical(587, 564, 429);
		linhaVertical(587, 564, 498);
		linhaHorizontal(0, 0, 587);

		// OITAVO BLOCO
		linhaHorizontal(0, 0, 605);
		linhaHorizontal(0, 0, 683);
		linhaHorizontal(0, 0, 698);

		// NONO BLOCO
		linhaVertical(721, 698, 230);
		linhaVertical(721, 698, 427);
		linhaHorizontal(0, 0, 721);

		// DECIMO BLOCO
		linhaHorizontal(0, 0, 738);
		linhaVertical(760, 738, 502);
		linhaVertical(760, 738, 383);
		linhaVertical(760, 738, 303);
		linhaVertical(760, 738, 233);
		linhaVertical(760, 738, 136);
		linhaHorizontal(0, 0, 760);
		linhaHorizontal(0, 0, 775);
		linhaVertical(760, 833, 376);

		linhaHorizontal(0, 0, 833);

		const alturaInicialDoSetimoBloco = 793.6;

		//SEXTO BLOCO
		titulo("NOME", 3, 458, 300, "", 7);
		titulo("VALOR", 93, 458, 300, "", 7);

		titulo("NOME", 124, 458, 300, "", 7);
		titulo("VALOR", 213, 458, 300, "", 7);

		titulo("NOME", 245, 458, 300, "", 7);
		titulo("VALOR", 330, 458, 300, "", 7);

		titulo("VALOR TOTAL DA PRESTAÇÃO DO SERVIÇO", 366, 458, 300, "left", 7);

		campo(dacte.getValorTotalDosServicos(), 545, 475, 100, "left", 9);

		titulo("VALOR A RECEBER", 366, 508, 383, "left", 7);
		campo(dacte.getValorDoFrete(), 545, 520, 300, "left", 9);

		//  SETIMO BLOCO - imposto
		normal(
			["INFORMAÇÕES RELATIVAS AO IMPOSTO"].join(" ").toUpperCase(),
			95,
			550,
			370,
			"center",
		);

		titulo("SITUAÇÃO TRIBUTÁRIA", 2, 567, 505);
		campo(impostos.getSitTrib(), 2, 577, 505, "left", 7);

		titulo("BASE DE CALCULO", 199, 567, 505);
		campo(impostos._baseDeCalculoDoIcms, 199, 577, 100, "left", 7);

		titulo("ALÍQ ICMS", 301, 567, 530);
		campo(impostos._valorTotalDoIpi, 301, 577, 100, "left", 7);

		titulo("VALOR ICMS", 350, 567, 570);
		campo(impostos._valorDoIcms, 350, 577, 100, "left", 7);

		titulo("% RED. BC ICMS", 432, 567, 430);
		campo(impostos._valorDaCofins, 432, 577, 100, "left", 7);

		titulo("ICMS ST", 500, 567, 490);
		campo(impostos._ValorDoIcmsSt, 500, 577, 100, "left", 7);

		//OITAVO BLOCO
		normal(["OBSERVAÇÕES"].join(" ").toUpperCase(), 238, 592, 90, "center");

		campo(cteInfo.getObservacao(), 3, 610, 550, "left", 8);

		//NONO BLOCO
		normal(
			["SEGURO DA VIAGEM"].join(" ").toUpperCase(),
			250,
			686,
			80,
			"center",
		);

		titulo("NOME DA SEGURADORA", 2, 700, 500);
		campo(cteInfo.getNomeSeg(), 2, 710, 500, "left", 7);
		titulo("RESPONSÁVEL", 233, 700, 500);
		campo(cteInfo.getRespSeg(), 233, 710, 500, "left", 7);
		titulo("NÚMERO DA APÓLICE", 430, 700, 500);
		campo(cteInfo.getApol(), 430, 710, 500, "left", 7);

		//DECIMO BLOCO
		normal(
			["INFORMAÇÕES ESPECÍFICAS DO MODAL RODOVIÁRIO"].join(" ").toUpperCase(),
			135,
			725,
			300,
			"center",
		);

		titulo("TERMO DE AUTORIZAÇÃO DE FRETAMENTO", 2, 741, 300);
		campo(cteInfo.getRodo(), 3, 751, 200, "left", 7);

		titulo("N° DO REGISTRO ESTADUAL", 140, 741, 300);
		campo(cteInfo.getNumeroRegEstadual(), 43, 750, 280, "", 7);

		titulo("PLACA DO VEÍCULO", 236, 741, 300);
		campo(cteInfo.getPlaca(), 50, 750, 400, "", 7);

		titulo("RENAVAN DO VEÍCULO", 306, 741, 300);
		campo(cteInfo.getRenavam(), 115, 750, 420, "", 7);

		titulo("UF DE LICENCIAMENTO DO VEÍCULO", 385, 741, 300);
		campo(cteInfo.getUFveiculo(), 170, 750, 440, "", 7);

		titulo("CNPJ/CPF", 505, 741, 300);
		campo(emitente.getRegistroNacional(), 304, 750, 460, "", 7);

		titulo("USO EXCLUSIVO DO EMISSOR DO CT-e OS", 112, 763, 400, "", 8);

		titulo("RESERVADO AO FISCO", 430, 763, 400, "", 8);

		const temLogotipo = emitente.getLogotipo();
		const identificacaoDoEmitenteY = temLogotipo ? 78 : 84;
		const identificacaoDoEmitenteX = temLogotipo ? 67 : 1.5;
		const identificacaoDoEmitenteLargura = temLogotipo ? 172 : 237; //
		const identificacaoDoEmitenteFonte = temLogotipo ? 0 : 1.5;

		if (temLogotipo) {
			const caminhoDoLogotipo = emitente.getLogotipo();
			pdf.image(
				caminhoDoLogotipo,
				margemEsquerda + args.ajusteX + 4.5,
				margemTopo + args.ajusteY + args.ajusteYDoLogotipo + 78,
				{
					fit: [60, 60],
				},
			);
		}

		negrito(
			emitente.getNome(),
			identificacaoDoEmitenteX,
			identificacaoDoEmitenteY + args.ajusteYDaIdentificacaoDoEmitente,
			identificacaoDoEmitenteLargura,
			"center",
			8 + identificacaoDoEmitenteFonte,
		);

		if (emitente.getEndereco().getPrimeiraLinha()) {
			normal(
				emitente.getEndereco().getPrimeiraLinha(),
				identificacaoDoEmitenteX,
				pdf.y - margemTopo + 2,
				identificacaoDoEmitenteLargura,
				"center",
				6 + identificacaoDoEmitenteFonte,
			);
		}

		if (emitente.getEndereco().getSegundaLinha()) {
			normal(
				emitente.getEndereco().getSegundaLinha(),
				identificacaoDoEmitenteX,
				pdf.y - margemTopo,
				identificacaoDoEmitenteLargura,
				"center",
				6 + identificacaoDoEmitenteFonte,
			);
		}

		let jaAdicionouEspacamento = false;

		if (emitente.getTelefone()) {
			jaAdicionouEspacamento = true;

			normal(
				`Telefone: ${emitente.getTelefoneFormatado()}`,
				identificacaoDoEmitenteX,
				pdf.y - margemTopo + 2,
				identificacaoDoEmitenteLargura,
				"center",
				6 + identificacaoDoEmitenteFonte,
			);
		}

		if (emitente.getEmail()) {
			normal(
				`Email: ${emitente.getEmail()}`,
				identificacaoDoEmitenteX,
				pdf.y - margemTopo + (jaAdicionouEspacamento ? 0 : 2),
				identificacaoDoEmitenteLargura,
				"center",
				6 + identificacaoDoEmitenteFonte,
			);
		}

		let infoEmitente = "";
		if (emitente.getRegistroNacionalFormatado()) {
			infoEmitente = `CNPJ/CPF: ${emitente.getRegistroNacionalFormatado()}`;
		}
		if (emitente.getInscricaoEstadual()) {
			infoEmitente = `${infoEmitente}  IE: ${emitente.getInscricaoEstadual()}`;
		}

		if (infoEmitente !== "") {
			normal(
				infoEmitente,
				identificacaoDoEmitenteX,
				pdf.y - margemTopo + 4,
				identificacaoDoEmitenteLargura,
				"center",
				6 + identificacaoDoEmitenteFonte,
			);
		}

		campo("DACTE OS", 237, 62, 200, "", 12);
		titulo(
			"Documento Auxiliar do Conhecimento de Transporte Eletrônico para Outros Serviços",
			237,
			75,
			200,
			"center",
		);

		normal("MODAL", 465, 63.5, 100);
		campo(cteInfo.getModalFrete(), 465, 80, 100);
		titulo("MODELO", 250, 92, "", "", 7);
		campo(cteInfo.getModelo(), 215, 102, 100);
		titulo("SÉRIE", 303, 92, "", "", 7);
		campo(dacte.getSerie(), 265, 102, 100);
		titulo("NÚMERO", 355, 92, "", "", 7);
		campo(dacte.getNumero(), 320, 102, 100);
		titulo("FL", 418, 92, "", "", 7);
		titulo("DATA E HORA DE EMISSÃO", 445, 92, "", "", 5);
		campo(dacte.getDataDaEmissaoFormatada(), 428, 102, 100, "", 8);
		titulo("INSC. SUFRAMA DO DESTINATÁRIO", 517, 92, "", "", 4);

		// CAMPO OPCIONAL 1 - FSDA
		const formularioDeSeguranca = dacte.getFormularioDeSeguranca();

		const informacoesComplementares = [dacte.getInformacoesComplementares()];

		if (formularioDeSeguranca) {
			informacoesComplementares.unshift(
				[
					"DANFE EM CONTINGÊNCIA, ",
					"IMPRESSO EM DECORRÊNCIA DE PROBLEMAS TÉCNICOS: ",
					formularioDeSeguranca.getJustificativa().toUpperCase(),
				].join(""),
			);
		}

		normal(
			informacoesComplementares.join(" - "),
			1,
			alturaInicialDoSetimoBloco + 7.5,
			386,
			"justify",
			6,
		);

		//RECIBO
		normal(
			[
				"DECLARO QUE RECEBI OS VOLUMES DESTE CONHECIMENTO EM PERFEITO ESTADO PELO QUE DOU POR CUMPRIDO O PRESENTE CONTRATO DE TRANSPORTE",
			]
				.join(" ")
				.toUpperCase(),
			1.5,
			3,
			595.44,
			"center",
			6.9,
		);

		titulo("NOME", 2, 13, 97);
		titulo("RG", 2, 31, 97);
		titulo("ASSINATURA / CARIMBO ", 182, 45, 374);
		titulo("TÉRMINO DA PRESTAÇÃO - DATA/HORA ", 340, 13, 374);
		titulo("INÍCIO DA PRESTAÇÃO - DATA/HORA ", 340, 31, 374);
		campo("CT-e OS ", 355, 13, 374, "center", 8);
		titulo("N°:", 340, 25, 324, "center", 8);
		campo(dacte.getNumero(), 350, 25, 330, "center", 8);
		titulo("Série:", 340, 38, 338, "center", 8);
		campo(dacte.getSerie(), 340, 38, 370, "center", 8);

		const codigoDeBarrasCodificado = dacte.getChaveDeAcesso();

		if (codigoDeBarrasCodificado) {
			pdf
				.font("codigoDeBarras")
				.fontSize(args.tamanhoDoCodigoDeBarras)
				.text(
					codigoDeBarrasCodificado,
					args.ajusteX + margemEsquerda + 280,
					args.ajusteY + margemTopo + 114,
					{
						align: "center",
						width: 249,
					},
				);
		}

		//PRIMEIRO BLOCO
		campo(dacte.getChaveDeAcesso(), 280, 160, 244);
		titulo("CHAVE DE ACESSO", 245, 151, 244, "", 8);
		titulo("TIPO DO CTE", 40, 151, 338, "", 7);
		campo(cteInfo.getTpCte(), 1.5, 160, 120); /// TODO: dacte.getTipoCTE()
		titulo("TIPO DO SERVIÇO", 150, 151, 338, "", 8);
		campo(cteInfo.getTipoServ(), 120, 160, 120, "", 8);

		titulo(
			"Consulta de autenticidade no portal nacional do CT-e, no site da Sefaz Autorizadora, ou em http://www.cte.fazenda.gov.br",
			250,
			180,
			330,
			"center",
			6,
		);
		//SEGUNDO BLOCO
		titulo("PROTOCOLO DE AUTORIZAÇÃO DE USO", 245, 202, 244, "", 8);
		campo(protocolo.getFormatacao(), 300, 212, 244, "", 8);

		titulo("CFOP - NATUREZA DA OPERAÇÃO", 1.5, 171, 355, "", 8);
		campo(cteInfo.getCFOP(), 1.5, 180, 300, "left", 8);
		campo(cteInfo.getNatOp(), 24.5, 180, 210, "left", 8);

		titulo("INÍCIO DA PRESTAÇÃO", 1.5, 222, 272, "", 8);
		campo(cteInfo.getInicioPrestacao(), 1, 230, 120, "left", 8);

		titulo("PERCURSO DO VEÍCULO", 200, 222, 100, "", 8);

		titulo("TÉRMINO DA PRESTAÇÃO", 380, 222, 119, "", 8);
		campo(cteInfo.getFinalDaPrestacao(), 380, 230, 120, "left", 8);

		//BLOCO TOMADOR DE SERVIÇO
		normal(
			["TOMADOR / USUÁRIO DO SERVIÇO"].join(" ").toUpperCase(),
			168,
			244,
			200,
			"center",
		);

		const tomador = TomadorDeServico(cteInfo.getCodToma());
		titulo("NOME/RAZÃO:", 1, 258, 300, "left", 7);
		titulo("ENDEREÇO:", 1, 267, 300, "left", 7);
		titulo("CNPJ/CPF:", 1, 276, 100, "left", 7);
		titulo("INSCRIÇÃO ESTADUAL:", 170, 276, 100, "left", 7);
		titulo("MUNICÍPIO:", 300, 258, 100, "left", 7);
		titulo("UF:", 400, 267, 100, "left", 7);
		titulo("CEP:", 508, 258, 100, "left", 7);
		titulo("FONE:", 370, 276, 100, "left", 7);
		titulo("PAÍS:", 450, 267, 100, "left", 7);

		if (tomador !== "") {
			campo(tomador.getNome(), 51, 258, 200, "left", 7);
			campo(tomador.getEndereco().getPrimeiraLinha(), 42, 267, 200, "left", 7);
			campo(tomador.getRegistroNacionalFormatado(), 35, 276, 200, "left", 7);
			campo(tomador.getInscricaoEstadual(), 249, 276, 100, "left", 7);
			campo(tomador.getEndereco().getMunicipio(), 340, 258, 120, "left", 7);
			campo(tomador.getEndereco().getPais(), 468, 267, 100, "left", 7);
			campo(tomador.getEndereco().getUf(), 412, 267, 100, "left", 7);
			campo(tomador.getEndereco().getCep(), 524, 258, 200, "left", 7);
			campo(tomador.getTelefone(), 392, 276, 100, "left", 7);
		}

		//QUINTO BLOCO
		normal(
			["INFORMAÇÕES DA PRESTAÇÃO DO SERVIÇO"].join(" ").toUpperCase(),
			188,
			291,
			200,
			"center",
		);
		titulo("QUANTIDADE", 40, 306, 200, "", 7);
		campo(cteInfo.getCargaOS(), 18, 316, 70, "", 7);

		titulo("DESCRIÇÃO DO SERVIÇO PRESTADO", 140, 306, 200, "", 7);
		campo(cteInfo.getDescServico(), 93, 317, 210, "", 7);

		//SEXTO BLOCO
		normal(
			["COMPONENTES DO VALOR DA PRESTAÇÃO DO SERVIÇO"].join(" ").toUpperCase(),
			170,
			440,
			250,
			"center",
		);

		const componenteServico = cteInfo.getComponenteServico();
		let xComponente = 3;
		let yComponente = 460;
		if (componenteServico && Array.isArray(componenteServico)) {
			componenteServico.map((componente: Any) => {
				yComponente += 10;
				if (yComponente > 480) {
					//adicionou 4 linhas vai pra outra coluna
					yComponente = 446;
					xComponente += 161;
				}
				return (
					normal(
						String(componente.xNome._text),
						xComponente,
						yComponente,
						80,
						"left",
						6,
					),
					normal(
						String(componente.vComp._text),
						xComponente + 80,
						yComponente,
						80,
						"left",
						6,
					)
				);
			});
		} else if (componenteServico) {
			yComponente += 10;
			normal(
				String(componenteServico.xNome._text),
				xComponente,
				yComponente,
				80,
				"left",
				6,
			);
			normal(
				String(componenteServico.vComp._text),
				xComponente + 80,
				yComponente,
				80,
				"left",
				6,
			);
		}
		if (args.creditos) {
			italico(args.creditos, 1.5, 827, larguraDoFormulario);
		}
	}

	desenharPagina();

	let numeroDePaginas = 1;
	let yNotas = 547;
	let xNotas = 1;

	itens.map((item) => {
		yNotas += 10;
		if (yNotas > 690) {
			// ultrapassou o limite de itens insere na outra coluna
			yNotas = 557;
			xNotas += 300;
			if (xNotas > 600) {
				// preencheu as duas colunas cria uma nova pagina
				numeroDePaginas += 1;
				pdf.addPage();
				desenharPagina();
				xNotas = 1;
			}
		}
		return (
			normal("NFE", xNotas, yNotas, 30, "left"),
			normal(item.getCodigo(), xNotas + 60, yNotas, 200, "left", 7),
			normal(item.getDescricao(), xNotas + 220, yNotas, 100, "left")
		);
	});

	const paginas = pdf.bufferedPageRange();

	for (let i = paginas.start; i < paginas.start + paginas.count; i++) {
		pdf.switchToPage(i);
		negrito(`${i + 1}/${numeroDePaginas}`, 372, 102, 98.5, "center", 8);
	}

	pdf.flushPages();
	pdf.end();

	callback(null as unknown as Error, pdf);
};
