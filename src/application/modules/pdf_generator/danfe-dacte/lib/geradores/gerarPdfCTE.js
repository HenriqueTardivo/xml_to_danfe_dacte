"use strict";

var path = require("path"),
    gammautils = require("../../../gammautils/index"),
    barcode = gammautils.barcode,
    merge = gammautils.object.merge,
    Pdf = require("pdfkit"),
    diretorioDeFontes = path.join(__dirname, "./fontes"),
    timesNewRoman = path.join(diretorioDeFontes, "Times New Roman.ttf"),
    timesNewRomanNegrito = path.join(
        diretorioDeFontes,
        "Times New Roman Bold.ttf"
    ),
    timesNewRomanItalico = path.join(
        diretorioDeFontes,
        "Times New Roman Italic.ttf"
    ),
    timesNewRomanNegritoItalico = path.join(
        diretorioDeFontes,
        "Times New Roman Bold Italic.ttf"
    );

var pdfDefaults = {
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

    tamanhoDaFonteDosItens: 7,
    separadorDeItens: true,

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

module.exports = function (dacte, args, callback) {
    if (typeof args === "function") {
        callback = args;
        args = pdfDefaults;
    }

    args = merge(pdfDefaults, args);

    var emitente = dacte.getEmitente(),
        destinatario = dacte.getDestinatario(),
        transportador = dacte.getTransportador(),
        impostos = dacte.getImpostos(),
        protocolo = dacte.getProtocolo(),
        itens = dacte.getItens(),
        expeditor = dacte.getExpeditor(),
        recebedor = dacte.getRecebedor(),
        cteInfo = dacte.getCteInfo(),
        pdf = new Pdf({
            pdfVersion: "1.7",
            bufferPages: true,
            margin: 0,
            size: [args.larguraDaPagina, args.alturaDaPagina],
            info: {
                Author: "Henrique Tardivo",
                Title: args.titulo,
                Creator: "Henrique Tardivo",
                Producer: "http://github.com/HenriqueTardivo",
            },
        });
    if (args.stream) {
        pdf.pipe(args.stream);
    }

    pdf.registerFont("normal", timesNewRoman);
    pdf.registerFont("negrito", timesNewRomanNegrito);
    pdf.registerFont("italico", timesNewRomanItalico);
    pdf.registerFont("negrito-italico", timesNewRomanNegritoItalico);
    pdf.registerFont("codigoDeBarras", barcode.code128.font);

    function TomadorDeServico(toma) {
        return (
            {
                0: dacte._transportador, //remetente
                1: dacte._expeditor,
                2: dacte._recebedor,
                3: dacte._destinatario,
            }[toma] || ""
        );
    }
    ///////// LAYOUT
    var grossuraDaLinha = 0.5,
        margemTopo = 2.8,
        margemEsquerda = 3,
        margemDireita = 589.65,
        larguraDoFormulario = margemDireita - margemEsquerda;

    pdf.lineWidth(grossuraDaLinha);

    function linhaHorizontal(x1, x2, y, cor) {
        y = margemTopo + args.ajusteY + y;
        x1 = margemEsquerda + args.ajusteX + x1;
        x2 = margemDireita + args.ajusteX + x2;

        return pdf
            .moveTo(x1, y)
            .lineTo(x2, y)
            .stroke(cor || args.corDoLayout);
    }

    function linhaVertical(y1, y2, x, cor) {
        x = margemEsquerda + args.ajusteX + x;
        y1 = margemTopo + args.ajusteY + y1;
        y2 = margemTopo + args.ajusteY + y2;

        return pdf
            .moveTo(x, y1)
            .lineTo(x, y2)
            .stroke(cor || args.corDoLayout);
    }
    function titulo(string, x, y, largura, alinhamento, tamanho) {
        string =
            (typeof string !== "undefined" &&
                string !== null &&
                string.toString()) ||
            "";

        x = margemEsquerda + args.ajusteX + x;
        y = margemTopo + args.ajusteY + y;

        pdf.font("normal")
            .fillColor(args.corDoTitulo)
            .fontSize(tamanho || args.tamanhoDaFonteDoTitulo)
            .text(string.toUpperCase(), x, y, {
                width: largura,
                align: alinhamento || args.alinhamentoDoTitulo,
            });
    }

    function normal(string, x, y, largura, alinhamento, tamanho, _pdf) {
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
                }
            );
    }

    function italico(string, x, y, largura, alinhamento, tamanho) {
        string = string || "";

        pdf.font("italico")
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
                }
            );
    }

    function negrito(string, x, y, largura, alinhamento, tamanho) {
        string = string || "";

        pdf.font("negrito")
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
                }
            );
    }

    function campo(string, x, y, largura, alinhamento, tamanho) {
        string = string || "";

        pdf.font("negrito")
            .fillColor(args.corDoCampo)
            .fontSize(tamanho || args.tamanhoDaFonteDoCampo)
            .text(
                string,
                margemEsquerda + args.ajusteX + x,
                margemTopo + args.ajusteY + y,
                {
                    width: largura,
                    align: alinhamento || args.alinhamentoDoCampo,
                }
            );
    }

    function desenharPagina() {
        if (args.ambiente !== "producao") {
            pdf.font("normal")
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
                    }
                );

            pdf.font("normal")
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
                    }
                );
        }

        //RECIBO
        linhaHorizontal(0, 0, 0);
        linhaHorizontal(0, 0, 12);
        linhaHorizontal(0, -450, 30);
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
        linhaVertical(59.55, 815, 0); //borda esquerda
        linhaVertical(59.55, 221, 240.75);
        linhaVertical(59.55, 90, 440); //aqui
        linhaVertical(59.55, 230, larguraDoFormulario);
        linhaVertical(90, 112, 290);
        linhaVertical(90, 112, 340);
        linhaVertical(90, 112, 400);
        linhaVertical(90, 112, 440);
        linhaVertical(90, 112, 515);
        linhaVertical(150, 201, 120);
        linhaVertical(200, 815, larguraDoFormulario); //borda direita

        //SEGUNDO BLOCO
        linhaHorizontal(0, 0, 201.2);
        linhaHorizontal(0, 0, 221);
        linhaHorizontal(0, 0, 241);
        linhaVertical(201.2, 261, 0);
        linhaVertical(221, 342, 274.9);
        linhaVertical(201.2, 261, larguraDoFormulario);

        //QUARTO BLOCO
        linhaHorizontal(0, 0, 291);
        linhaHorizontal(0, 0, 342);
        linhaHorizontal(0, 0, 370);

        //QUINTO BLOCO
        //primeira linha
        linhaVertical(370, 395, 320);
        linhaVertical(370, 395, 480);
        linhaHorizontal(0, 0, 395);
        //segunda linha
        linhaVertical(395, 425, 60);
        linhaVertical(395, 425, 120);
        linhaVertical(395, 425, 180);
        linhaVertical(395, 425, 240);
        linhaVertical(395, 425, 300);
        linhaVertical(405, 425, 400);
        linhaVertical(405, 425, 490);
        linhaHorizontal(0, 0, 425);
        linhaHorizontal(300, 0, 405);
        linhaHorizontal(0, 0, 435);

        //SEXTO BLOCO
        linhaHorizontal(0, 0, 495);
        linhaHorizontal(500, 0, 465);
        linhaVertical(435, 495, 500);
        linhaVertical(435, 495, 320);
        linhaVertical(435, 495, 160);
        linhaHorizontal(0, 0, 495);
        linhaHorizontal(0, 0, 505);

        //imposto
        linhaVertical(505, 535, 140);
        linhaVertical(505, 535, 220);
        linhaVertical(505, 535, 310);
        linhaVertical(505, 535, 400);
        linhaVertical(505, 535, 480);
        linhaHorizontal(0, 0, 535);

        //SETIMO BLOCO
        linhaHorizontal(0, 0, 545);
        linhaHorizontal(0, 0, 695);
        linhaVertical(545, 695, 297);

        //OITAVO BLOCO
        linhaHorizontal(0, 0, 705);
        linhaHorizontal(0, 0, 745);
        linhaHorizontal(0, 0, 755);
        linhaHorizontal(0, 0, 775);
        linhaHorizontal(0, 0, 785);
        linhaHorizontal(0, 0, 815);
        linhaVertical(755, 775, 120);
        linhaVertical(755, 775, 190);
        linhaVertical(755, 775, 280);
        linhaVertical(775, 815, 460);

        var alturaInicialDoSetimoBloco = 793.6;

        //SEXTO BLOCO
        titulo("VALOR TOTAL DO SERVIÇO", 502, 436, 300, "left", 5);
        campo(dacte.getValorTotalDosServicos(), 517, 446, 300, "left");
        titulo("VALOR A RECEBER", 502, 467, 300, "left", 5);
        campo(dacte.getValorDoFreteFormatado(), 517, 477, 300, "lefte");

        titulo("NOME", 1, 436, 50);
        titulo("VALOR", 80, 436, 50);
        titulo("NOME", 161, 436, 50);
        titulo("VALOR", 240, 436, 50);
        titulo("NOME", 321, 436, 50);
        titulo("VALOR", 400, 436, 50);

        //imposto
        titulo("INFORMAÇÕES RELATIVAS AO IMPOSTO", 240, 496, 300);
        titulo("SITUAÇÃO TRIBUTÁRIA", 1, 506, 300);
        campo(impostos._valorDoPis, 1, 516, 100, "left"); //campo reutilizado
        titulo("BASE DE CALCULO", 142, 506, 300);
        campo(impostos._baseDeCalculoDoIcms, 142, 516, 100, "left");
        titulo("ALÍQ ICMS", 220, 506, 300);
        campo(impostos._valorTotalDoIpi, 220, 516, 100, "left");
        titulo("VALOR ICMS", 312, 506, 300);
        campo(impostos._valorDoIcms, 312, 516, 100, "left");
        titulo("% RED. BC ICMS", 402, 506, 300);
        campo(impostos._valorDaCofins, 402, 516, 100, "left");
        titulo("ICMS ST", 482, 506, 300);
        campo(impostos._ValorDoIcmsSt, 482, 516, 100, "left");

        //SETIMO BLOCO
        titulo("DOCUMENTOS ORIGINÁRIOS", 250, 536, 300);
        titulo("TIPO DOC", 1, 547, 300);
        titulo("CNPJ/CHAVE", 60, 547, 300);
        titulo("SÉRIE/NRO. DOCUMENTO", 220, 547, 300, "", 5);
        titulo("TIPO DOC", 300, 547, 300);
        titulo("CNPJ/CHAVE", 360, 547, 300);
        titulo("SÉRIE/NRO. DOCUMENTO", 520, 547, 300, "", 5);

        //OITAVO BLOCO
        titulo("OBSERVAÇÕES", 270, 696, 300);
        normal(cteInfo.getObservacao(), 1, 706, 585, "left", 6);
        titulo(
            "DADOS ESPECÍFICOS DO MODAL RODOVIÁRIO - CARGA FRACIONADA",
            160,
            746,
            300
        );
        titulo("RNTRC DA EMPRESA", 1, 756, 300);
        campo(cteInfo.getRNTRC(), 1, 766, 200, "left", 8);
        titulo("CIOT", 121, 756, 300);
        campo(cteInfo.getCIOT(), 121, 766, 200, "left", 8); //
        titulo("DATA PREVISTA DE ENTREGA", 191, 756, 300, "", 5);
        campo(cteInfo.getDataEntrega(), 191, 766, 200, "left", 7); //
        titulo(
            "ESTE CONHECIMENTO DE TRANSPORTE ATENDE À LEGISLAÇÃO DE TRANSPORTE RODOVIÁRIO EM VIGOR",
            291,
            756,
            250,
            "center",
            6
        );
        titulo("USO EXCLUSIVO DO EMISSOR DO CT-E", 185, 776, 200);
        titulo("RESERVADO AO FISCO", 491, 776, 200);
        alturaInicialDoSetimoBloco = 762.2;

        // SÉTIMO BLOCO
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
            6.9
        );

        campo("DACTE", 240, 63.5, 197, "center", 10);
        normal(dacte.getNumeroFormatado(), 484, 22, 110, "center", 6);
        normal(dacte.getSerieFormatada(), 487, 40, 110, "center", 6);

        var temLogotipo = emitente.getLogotipo(),
            identificacaoDoEmitenteY = temLogotipo ? 78 : 84,
            identificacaoDoEmitenteX = temLogotipo ? 67 : 1.5,
            identificacaoDoEmitenteLargura = temLogotipo ? 172 : 237, //
            identificacaoDoEmitenteFonte = temLogotipo ? 0 : 1.5;

        if (temLogotipo) {
            var caminhoDoLogotipo = emitente.getLogotipo();
            pdf.image(
                caminhoDoLogotipo,
                margemEsquerda + args.ajusteX + 4.5,
                margemTopo + args.ajusteY + args.ajusteYDoLogotipo + 78,
                {
                    fit: [60, 60],
                }
            );
        }

        negrito(
            emitente.getNome(),
            identificacaoDoEmitenteX,
            identificacaoDoEmitenteY + args.ajusteYDaIdentificacaoDoEmitente,
            identificacaoDoEmitenteLargura,
            "center",
            8 + identificacaoDoEmitenteFonte
        );

        if (emitente.getEndereco().getPrimeiraLinha()) {
            normal(
                emitente.getEndereco().getPrimeiraLinha(),
                identificacaoDoEmitenteX,
                pdf.y - margemTopo + 2,
                identificacaoDoEmitenteLargura,
                "center",
                6 + identificacaoDoEmitenteFonte
            );
        }

        if (emitente.getEndereco().getSegundaLinha()) {
            normal(
                emitente.getEndereco().getSegundaLinha(),
                identificacaoDoEmitenteX,
                pdf.y - margemTopo,
                identificacaoDoEmitenteLargura,
                "center",
                6 + identificacaoDoEmitenteFonte
            );
        }

        var jaAdicionouEspacamento = false;

        if (emitente.getTelefone()) {
            jaAdicionouEspacamento = true;

            normal(
                "Telefone: " + emitente.getTelefoneFormatado(),
                identificacaoDoEmitenteX,
                pdf.y - margemTopo + 2,
                identificacaoDoEmitenteLargura,
                "center",
                6 + identificacaoDoEmitenteFonte
            );
        }

        if (emitente.getEmail()) {
            normal(
                "Email: " + emitente.getEmail(),
                identificacaoDoEmitenteX,
                pdf.y - margemTopo + (jaAdicionouEspacamento ? 0 : 2),
                identificacaoDoEmitenteLargura,
                "center",
                6 + identificacaoDoEmitenteFonte
            );
        }

        let infoEmitente = "";
        if (emitente.getRegistroNacionalFormatado()) {
            infoEmitente =
                "CNPJ/CPF: " + emitente.getRegistroNacionalFormatado();
        }
        if (emitente.getInscricaoEstadual()) {
            infoEmitente =
                infoEmitente +
                "  Insc.Estadual: " +
                emitente.getInscricaoEstadual();
        }

        if (infoEmitente !== "") {
            normal(
                infoEmitente,
                identificacaoDoEmitenteX,
                pdf.y - margemTopo + 4,
                identificacaoDoEmitenteLargura,
                "center",
                6 + identificacaoDoEmitenteFonte
            );
        }

        normal(
            "Documento Auxiliar do Conhecimento de Transporte Eletrônico",
            270,
            72,
            135,
            "center"
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
        var formularioDeSeguranca = dacte.getFormularioDeSeguranca();

        var informacoesComplementares = [dacte.getInformacoesComplementares()];

        if (formularioDeSeguranca) {
            informacoesComplementares.unshift(
                [
                    "DANFE EM CONTINGÊNCIA, ",
                    "IMPRESSO EM DECORRÊNCIA DE PROBLEMAS TÉCNICOS: ",
                    formularioDeSeguranca.getJustificativa().toUpperCase(),
                ].join("")
            );
        }

        normal(
            informacoesComplementares.join(" - "),
            1,
            alturaInicialDoSetimoBloco + 7.5,
            386,
            "justify",
            6
        );

        //RECIBO
        titulo("NOME", 2, 13, 97);
        titulo("RG", 2, 31, 97);
        titulo("ASSINATURA / CARIMBO ", 182, 45, 374);
        titulo("TÉRMINO DA PRESTAÇÃO - DATA/HORA ", 340, 13, 374);
        titulo("INÍCIO DA PRESTAÇÃO - DATA/HORA ", 340, 31, 374);
        campo("CT-E ", 355, 13, 374, "center", 8);

        var codigoDeBarrasCodificado = barcode.code128.encode(
            dacte.getChaveDeAcesso()
        );
        if (dacte.getChaveDeAcesso()) {
            pdf.font("codigoDeBarras")
                .fontSize(args.tamanhoDoCodigoDeBarras)
                .text(
                    codigoDeBarrasCodificado,
                    args.ajusteX + margemEsquerda + 280,
                    args.ajusteY + margemTopo + 114,
                    {
                        align: "center",
                        width: 249,
                    }
                );
        }

        //PRIMEIRO BLOCO
        campo(dacte.getChaveDeAcesso(), 280, 160, 244);
        titulo("CHAVE DE ACESSO", 245, 151, 244, "", 8);
        titulo("TIPO DO CTE", 40, 151, 338, "", 8);
        campo(cteInfo.getTpCte(), 1.5, 160, 120); /// TODO: dacte.getTipoCTE()

        titulo("TIPO DO SERVIÇO", 150, 151, 338, "", 8);
        campo(cteInfo.getTpServ(), 120, 160, 120); /// TODO: dacte.getTipoServicoCTE()

        titulo("TOMADOR DE SERVIÇO", 20, 171, 338, "", 8);
        campo(cteInfo.getToma(), 1.5, 190, 120); /// TODO: dacte.getTipoServicoCTE()

        titulo(
            "Consulta de autenticidade no portal nacional do CT-e, no site da Sefaz Autorizadora, ou em http://www.cte.fazenda.gov.br",
            250,
            180,
            330,
            "center",
            6
        );
        //SEGUNDO BLOCO
        titulo("PROTOCOLO DE AUTORIZAÇÃO DE USO", 245, 202, 244, "", 8);
        campo(protocolo.getFormatacao(), 300, 212, 244, "", 8);

        titulo("CFOP - NATUREZA DA OPERAÇÃO", 1.5, 202, 353.5, "", 8);
        campo(cteInfo.getCfopFrete(), 1.5, 212, 300, "left", 7);
        titulo("INÍCIO DA PRESTAÇÃO", 1.5, 222, 272, "", 8);
        campo(cteInfo.getInicioPrestacao(), 1, 230, 120, "left", 8);
        titulo("TÉRMINO DA PRESTAÇÃO", 278, 222, 119, "", 8);
        campo(cteInfo.getFinalDaPrestacao(), 278, 230, 120, "left", 8);

        //QUARTO BLOCO
        titulo("REMETENTE", 1, 241, 100, "left", 7);
        titulo("ENDEREÇO", 1, 251, 100, "left", 7);
        titulo("MUNICÍPIO", 1, 261, 100, "left", 7);
        titulo("CEP", 110, 261, 100, "right", 7);
        titulo("CNPJ/CPF", 1, 271, 100, "left", 7);
        titulo("INSCRIÇÃO ESTADUAL", 110, 271, 100, "right", 7);
        titulo("PAÍS", 1, 281, 100, "left", 7);
        titulo("FONE", 110, 281, 100, "right", 7);
        campo(transportador.getNome(), 45, 241, 400, "left", 7);
        campo(transportador.getEndereco().getCep(), 215, 261, 100, "left", 7);
        campo(transportador.getInscricaoEstadual(), 215, 271, 100, "left", 7);
        campo(transportador.getTelefone(), 215, 281, 100, "left", 7);
        campo(
            transportador.getEndereco().getPrimeiraLinha(),
            40,
            251,
            280,
            "left",
            6
        );
        campo(
            transportador.getEndereco().getMunicipio(),
            40,
            261,
            120,
            "left",
            7
        );
        campo(
            transportador.getRegistroNacionalFormatado(),
            40,
            271,
            120,
            "left",
            7
        );
        campo(transportador.getEndereco().getPais(), 40, 281, 120, "left", 7);

        titulo("DESTINATÁRIO", 278, 241, 100, "left", 7);
        titulo("ENDEREÇO", 278, 251, 120, "left", 7);
        titulo("MUNICÍPIO", 278, 261, 100, "left", 7);
        titulo("CEP", 420, 261, 100, "right", 7);

        titulo("CNPJ/CPF", 278, 271, 100, "left", 7);
        titulo("INSCRIÇÃO ESTADUAL", 420, 271, 100, "right", 7);

        titulo("PAÍS", 278, 281, 100, "left", 7);
        titulo("FONE", 420, 281, 100, "right", 7);
        campo(destinatario.getEndereco().getCep(), 525, 261, 100, "left", 7);
        campo(destinatario.getInscricaoEstadual(), 525, 271, 100, "left", 7);
        campo(destinatario.getTelefone(), 525, 281, 100, "left", 7);

        campo(destinatario.getNome(), 331, 241, 400, "left", 7);
        campo(
            destinatario.getEndereco().getPrimeiraLinha(),
            321,
            251,
            280,
            "left",
            6
        );
        campo(
            destinatario.getEndereco().getMunicipio(),
            321,
            261,
            120,
            "left",
            7
        );
        campo(
            destinatario.getRegistroNacionalFormatado(),
            321,
            271,
            120,
            "left",
            7
        );
        campo(destinatario.getEndereco().getPais(), 321, 281, 120, "left", 7);

        //QUARTO BLOCO
        titulo("EXPEDITOR", 1, 292, 100, "left", 7);
        titulo("ENDEREÇO", 1, 302, 100, "left", 7);
        titulo("MUNICÍPIO", 1, 312, 100, "left", 7);
        titulo("CEP", 110, 312, 100, "right", 7);
        titulo("CNPJ/CPF", 1, 322, 100, "left", 7);
        titulo("INSCRIÇÃO ESTADUAL", 110, 322, 100, "right", 7);
        titulo("PAÍS", 1, 332, 100, "left", 7);
        titulo("FONE", 110, 332, 100, "right", 7);
        campo(expeditor.getNome(), 45, 292, 400, "left", 7);
        campo(expeditor.getEndereco().getCep(), 215, 312, 100, "left", 7);
        campo(expeditor.getInscricaoEstadual(), 215, 322, 100, "left", 7);
        campo(expeditor.getTelefone(), 215, 332, 100, "left", 7);
        campo(
            expeditor.getEndereco().getPrimeiraLinha(),
            40,
            302,
            280,
            "left",
            6
        );
        campo(expeditor.getEndereco().getMunicipio(), 40, 312, 120, "left", 7);
        campo(
            expeditor.getRegistroNacionalFormatado(),
            40,
            322,
            280,
            "left",
            6
        );
        campo(expeditor.getEndereco().getPais(), 40, 332, 120, "left", 7);

        titulo("RECEBEDOR", 278, 292, 100, "left", 7);
        titulo("ENDEREÇO", 278, 302, 120, "left", 7);
        titulo("MUNICÍPIO", 278, 312, 100, "left", 7);
        titulo("CEP", 420, 312, 100, "right", 7);

        titulo("CNPJ/CPF", 278, 322, 100, "left", 7);
        titulo("INSCRIÇÃO ESTADUAL", 420, 322, 100, "right", 7);

        titulo("PAÍS", 278, 332, 100, "left", 7);
        titulo("FONE", 420, 332, 100, "right", 7);
        campo(recebedor.getEndereco().getCep(), 525, 312, 100, "left", 7);
        campo(recebedor.getInscricaoEstadual(), 525, 322, 100, "left", 7);
        campo(recebedor.getTelefone(), 525, 332, 100, "left", 7);

        campo(recebedor.getNome(), 331, 292, 400, "left", 7);
        campo(
            recebedor.getEndereco().getPrimeiraLinha(),
            321,
            302,
            120,
            "left",
            7
        );
        campo(recebedor.getEndereco().getMunicipio(), 321, 312, 120, "left", 7);
        campo(
            recebedor.getRegistroNacionalFormatado(),
            321,
            322,
            120,
            "left",
            7
        );
        campo(recebedor.getEndereco().getPais(), 321, 331, 120, "left", 7);

        //BLOCO TOMADOR DE SERVIÇO
        const tomador = TomadorDeServico(cteInfo.getCodToma());
        titulo("TOMADOR DE SERVIÇO", 1, 342, 100, "left", 7);
        titulo("ENDEREÇO", 1, 352, 100, "left", 7);
        titulo("CNPJ/CPF", 1, 362, 100, "left", 7);
        titulo("INSCRIÇÃO ESTADUAL", 300, 362, 100, "left", 7);
        titulo("MUNICÍPIO", 300, 342, 100, "left", 7);
        titulo("UF", 450, 342, 100, "left", 7);
        titulo("CEP", 510, 342, 100, "left", 7);
        titulo("FONE", 510, 362, 100, "left", 7);
        titulo("PAÍS", 450, 362, 100, "left", 7);

        if (tomador !== "") {
            campo(tomador.getNome(), 85, 342, 250, "left", 7);
            campo(
                tomador.getEndereco().getPrimeiraLinha(),
                80,
                352,
                200,
                "left",
                7
            );
            campo(
                tomador.getRegistroNacionalFormatado(),
                80,
                362,
                200,
                "left",
                7
            );
            campo(tomador.getInscricaoEstadual(), 380, 362, 200, "left", 7);
            campo(
                tomador.getEndereco().getMunicipio(),
                360,
                342,
                200,
                "left",
                7
            );
            campo(tomador.getEndereco().getPais(), 470, 362, 200, "left", 7);
            campo(tomador.getEndereco().getUf(), 465, 342, 200, "left", 7);
            campo(tomador.getEndereco().getCep(), 530, 342, 200, "left", 7);
            campo(tomador.getTelefone(), 530, 362, 200, "left", 7);
        }

        //QUINTO BLOCO
        //primeira linha
        titulo("PRODUTO PREDOMINANTE", 1, 372, 100, "left", 7);
        campo(cteInfo.getProdPred(), 1, 382, 400, "left", 6);
        titulo("OUTRAS CARACTERÍSTICAS DA CARGA", 322, 372, 300, "left", 7);
        campo(cteInfo.getCaracCarga(), 322, 382, 300, "left");
        titulo("VALOR TOTAL DA MERCADORIA", 482, 372, 300, "left", 6);
        campo(dacte.getValorTotalDosProdutosFormatado(), 482, 382, 200, "left");
        //segunda linha
        titulo("QNT. /UN. MED", 1, 398, 100, "left", 7);
        titulo("QNT. /UN. MED", 62, 398, 300, "left", 7);
        titulo("QNT. /UN. MED", 122, 398, 300, "left", 7);

        let xMedida = -58,
            yMedida = 404,
            medidas = cteInfo.getMedidas();

        if (medidas && Array.isArray(medidas)) {
            medidas.map((medida) => {
                xMedida += 60;
                if (xMedida > 122) {
                    xMedida = 2;
                    yMedida = 416;
                }
                return campo(
                    String(
                        medida.qCarga._text +
                            " / " +
                            cteInfo.retornaUnidadeMedida(medida.cUnid._text)
                    ),
                    xMedida,
                    yMedida,
                    60,
                    "left",
                    8
                );
            });
        } else if (medidas) {
            campo(
                String(
                    medidas.qCarga._text +
                        " / " +
                        cteInfo.retornaUnidadeMedida(medidas.cUnid._text)
                ),
                1,
                408,
                30,
                "left",
                8
            );
        }

        titulo("CUBAGEM(M3)", 182, 398, 300, "left", 7);
        campo(cteInfo.getCubagem(), 182, 408, 200, "left", 6);
        titulo("QTDE(VOL)", 242, 398, 300, "left", 7);
        campo(cteInfo.getVolume(), 242, 408, 200, "left", 6);
        titulo("NOME DA SEGURADORA", 302, 398, 300, "left", 6);
        titulo("RESPONSÁVEL ", 302, 408, 300, "left", 6);
        titulo("NÚMERO DA APOLICE", 402, 408, 120, "left", 6);
        titulo("NÚMERO DA AVERBAÇÃO", 492, 408, 300, "left", 6);

        titulo(
            "COMPONENTES DO VALOR DA PRESTAÇÃO DO SERVIÇO",
            195,
            426,
            300,
            "left",
            7
        );

        let componenteServico = cteInfo.getComponenteServico(),
            xComponente = 1,
            yComponente = 436;
        if (componenteServico && Array.isArray(componenteServico)) {
            componenteServico.map((componente) => {
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
                        6
                    ),
                    normal(
                        String(componente.vComp._text),
                        xComponente + 80,
                        yComponente,
                        80,
                        "left",
                        6
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
                6
            );
            normal(
                String(componenteServico.vComp._text),
                xComponente + 80,
                yComponente,
                80,
                "left",
                6
            );
        }
        if (args.creditos) {
            italico(args.creditos, 1.5, 827, larguraDoFormulario);
        }
    }

    desenharPagina();

    let numeroDePaginas = 1,
        yNotas = 547,
        xNotas = 1;

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

    var paginas = pdf.bufferedPageRange();

    for (var i = paginas.start; i < paginas.start + paginas.count; i++) {
        pdf.switchToPage(i);
        negrito(i + 1 + "/" + numeroDePaginas, 372, 102, 98.5, "center", 8);
    }

    pdf.flushPages();
    pdf.end();

    callback(null, pdf);
};
