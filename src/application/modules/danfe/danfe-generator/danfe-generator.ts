import { Duplicata } from "application/entities";
import { chopArray } from "../../../utils/chop-array";
import { Documento } from "../../../entities/documento";
import { PdfGenerator } from "../../pdf-generate/pdf-generator";

interface DanfeGeneratorProps {
  ambiente: "homologacao" | "producao";
  documento: Documento;
  ajusteYDoLogotipo?: number;
  ajusteYDaIdentificacaoDoEmitente?: number;
  creditos?: string;
}

class DanfeGenerator extends PdfGenerator {
  private danfeProps: DanfeGeneratorProps;

  constructor(props: DanfeGeneratorProps) {
    super();
    this.danfeProps = props;
  }

  private create() {
    if (this.danfeProps.ambiente !== "producao") {
      this.pdf
        .font("normal")
        .fillColor(this._pdfDefaults.corDoTitulo)
        .fontSize(50)
        .fillOpacity(this._pdfDefaults.opacidadeDaHomologacao)
        .text(
          "HOMOLOGAÇÃO",
          this._pdfDefaults.margemEsquerda + this._pdfDefaults.ajusteX + 0,
          this._pdfDefaults.margemTopo +
            this._pdfDefaults.ajusteY +
            400 +
            this._pdfDefaults.ajusteYDaHomologacao,
          {
            width: this._pdfDefaults.larguraDoFormulario,
            align: "center",
          }
        );

      this.pdf
        .font("normal")
        .fillColor(this._pdfDefaults.corDoTitulo)
        .fontSize(25)
        .fillOpacity(this._pdfDefaults.opacidadeDaHomologacao)
        .text(
          "SEM VALOR FISCAL",
          this._pdfDefaults.margemEsquerda + this._pdfDefaults.ajusteX + 0,
          this._pdfDefaults.margemTopo +
            this._pdfDefaults.ajusteY +
            450 +
            this._pdfDefaults.ajusteYDaHomologacao,
          {
            width: this._pdfDefaults.larguraDoFormulario,
            align: "center",
          }
        );
    }

    //RECIBO
    this.linhaHorizontal(0, 0, 0);
    this.linhaHorizontal(0, -110.5, 28.3);
    this.linhaHorizontal(0, 0, 51.1);

    this.linhaVertical(0, 51.1, 0);
    this.linhaVertical(28.3, 51.1, 99.2);
    this.linhaVertical(0, 51.1, 476);
    this.linhaVertical(0, 51.1, 0);
    this.linhaVertical(0, 51.1, this._pdfDefaults.larguraDoFormulario);

    //PRIMEIRO BLOCO
    //QUADRADO DO TIPO (ENTRADA OU SAIDA)
    this.linhaHorizontal(317.4, -255, 96.4);
    this.linhaVertical(96.4, 116.2, 317.4);
    this.linhaHorizontal(317.4, -255, 116.2);
    this.linhaVertical(96.4, 116.2, 331.55);

    this.linhaHorizontal(0, 0, 59.55);
    this.linhaHorizontal(340.05, 0, 104.8);
    this.linhaHorizontal(340.05, 0, 127.4);
    this.linhaHorizontal(0, 0, 150.2);
    this.linhaHorizontal(0, 0, 170);
    this.linhaHorizontal(0, 0, 190);

    this.linhaVertical(59.55, 190, 0);
    this.linhaVertical(59.55, 150.2, 240.75);
    this.linhaVertical(59.55, 170, 340.05);
    this.linhaVertical(59.55, 190, this._pdfDefaults.larguraDoFormulario);
    this.linhaVertical(170, 190, 195.55);
    this.linhaVertical(170, 190, 391);

    //SEGUNDO BLOCO
    this.linhaHorizontal(0, 0, 201.2);
    this.linhaHorizontal(0, 0, 221);
    this.linhaHorizontal(0, 0, 241);
    this.linhaHorizontal(0, 0, 261);

    this.linhaVertical(201.2, 261, 0);
    this.linhaVertical(201.2, 221, 357.1);
    this.linhaVertical(221, 261, 274.9);
    this.linhaVertical(241, 261, 297.6);
    this.linhaVertical(221, 261, 396.75);
    this.linhaVertical(201.2, 261, 493.1);
    this.linhaVertical(201.2, 261, this._pdfDefaults.larguraDoFormulario);

    //TERCEIRO BLOCO
    this.linhaHorizontal(0, 0, 269);
    this.linhaHorizontal(0, 0, 289);
    this.linhaHorizontal(0, 0, 309);

    this.linhaVertical(269, 309, 0);
    this.linhaVertical(269, 309, 87.7);
    this.linhaVertical(269, 309, 147);
    this.linhaVertical(269, 309, 221);
    this.linhaVertical(269, 309, 280);
    this.linhaVertical(269, 309, 343);
    this.linhaVertical(269, 309, 393);
    // this.linhaVertical(269, 309, 309);
    this.linhaVertical(269, 309, 87.7 * 5 + 0.6);
    this.linhaVertical(269, 309, 87.7 * 5 + 51.8);
    this.linhaVertical(269, 309, this._pdfDefaults.larguraDoFormulario);

    //QUARTO BLOCO
    this.linhaHorizontal(0, 0, 320);
    this.linhaHorizontal(0, 0, 340);
    this.linhaHorizontal(0, 0, 360);
    this.linhaHorizontal(0, 0, 380);

    this.linhaVertical(320, 380, 0);
    this.linhaVertical(320, 340, 340);
    this.linhaVertical(320, 340, 391);
    this.linhaVertical(320, 340, 465);
    this.linhaVertical(340, 360, 434);
    this.linhaVertical(320, 340, 486);
    this.linhaVertical(340, 360, 456.65);
    this.linhaVertical(320, 380, 258);
    this.linhaVertical(360, 380, 59.6);
    this.linhaVertical(360, 380, 158.6);
    this.linhaVertical(360, 380, 357);
    this.linhaVertical(360, 380, 473.3);
    this.linhaVertical(320, 380, this._pdfDefaults.larguraDoFormulario);
    //QUINTO BLOCO - LISTA DE PRODUTOS

    let alturaInicialDoQuadroDeItens = 391,
      alturaInicialDoQuadroDeDuplicatas = alturaInicialDoQuadroDeItens,
      alturaDeLinhaDeDuplicata = 23,
      duplicatasPorLinha = 8,
      larguraDaDuplicata =
        this._pdfDefaults.larguraDoFormulario / duplicatasPorLinha,
      segundaLinhaDoQuadroDeItens,
      linhasDeDuplicatas = 0,
      adicional_Itens_y = 22,
      alturaDoBlocoFaturaDuplicatas = 0,
      duplicatas = this.danfeProps.documento.duplicatas;

    if (this.danfeProps.documento.fatura) {
      adicional_Itens_y -= 9;
      alturaDoBlocoFaturaDuplicatas += this._pdfDefaults.tamanhoDaFonteDoTitulo;
      alturaInicialDoQuadroDeDuplicatas += 6.5;
    }

    if (duplicatas?.length) {
      adicional_Itens_y -= 1;
      linhasDeDuplicatas = Math.ceil(duplicatas.length / duplicatasPorLinha);
      alturaDoBlocoFaturaDuplicatas +=
        linhasDeDuplicatas * alturaDeLinhaDeDuplicata + 10;
    } else {
      alturaDoBlocoFaturaDuplicatas +=
        this._pdfDefaults.tamanhoDaFonteDoTitulo + 3;
    }

    if (duplicatas) {
      const _duplicatas = chopArray(duplicatas, duplicatasPorLinha);

      let margemDeCimaDaDuplicata = 2,
        margemEsquerdaDaDuplicata = 2,
        larguraDaDuplicataComMargem =
          larguraDaDuplicata - margemEsquerdaDaDuplicata - 1;

      _duplicatas.forEach((linha: Duplicata[], indiceDaLinha: number) => {
        let x1: number = 0,
          x2: number = 0,
          y: number = 0;

        linha.forEach((duplicata, indiceDaDuplicata) => {
          x1 = indiceDaDuplicata * larguraDaDuplicata;
          x2 = x1 + larguraDaDuplicata - this._pdfDefaults.larguraDoFormulario;
          y =
            alturaInicialDoQuadroDeDuplicatas +
            indiceDaLinha * alturaDeLinhaDeDuplicata;

          this.linhaHorizontal(x1, x2, y);
          this.linhaVertical(y, y + alturaDeLinhaDeDuplicata, x1);

          this.titulo(
            "NÚM.",
            x1 + margemEsquerdaDaDuplicata,
            y + margemDeCimaDaDuplicata,
            larguraDaDuplicataComMargem
          );
          this.titulo(
            String(duplicata.numero),
            x1 + margemEsquerdaDaDuplicata,
            y + margemDeCimaDaDuplicata,
            larguraDaDuplicataComMargem,
            "right"
          );

          this.titulo(
            "VENC.",
            x1 + margemEsquerdaDaDuplicata,
            y +
              margemDeCimaDaDuplicata +
              this._pdfDefaults.tamanhoDaFonteDoTitulo,
            larguraDaDuplicataComMargem,
            "left"
          );
          this.titulo(
            duplicata.vencimento,
            x1 + margemEsquerdaDaDuplicata,
            y +
              margemDeCimaDaDuplicata +
              this._pdfDefaults.tamanhoDaFonteDoTitulo,
            larguraDaDuplicataComMargem,
            "right"
          );

          this.titulo(
            "VALOR",
            x1 + margemEsquerdaDaDuplicata,
            y +
              margemDeCimaDaDuplicata +
              2 * this._pdfDefaults.tamanhoDaFonteDoTitulo,
            larguraDaDuplicataComMargem,
            "left"
          );
          this.titulo(
            duplicata.valor,
            x1 + margemEsquerdaDaDuplicata,
            y +
              margemDeCimaDaDuplicata +
              2 * this._pdfDefaults.tamanhoDaFonteDoTitulo,
            larguraDaDuplicataComMargem,
            "right"
          );
        });

        this.linhaVertical(
          y,
          y + alturaDeLinhaDeDuplicata,
          x1 + larguraDaDuplicata
        );
        this.linhaHorizontal(0, x2, y + alturaDeLinhaDeDuplicata);
      });
    }

    alturaInicialDoQuadroDeItens += alturaDoBlocoFaturaDuplicatas;
    segundaLinhaDoQuadroDeItens = alturaInicialDoQuadroDeItens + 14.2;

    this.linhaHorizontal(0, 0, alturaInicialDoQuadroDeItens);
    this.linhaHorizontal(0, 0, segundaLinhaDoQuadroDeItens);
    this.linhaHorizontal(0, 0, 751);

    this.linhaVertical(alturaInicialDoQuadroDeItens, 751, 0);
    this.linhaVertical(alturaInicialDoQuadroDeItens, 751, 53.8);
    this.linhaVertical(alturaInicialDoQuadroDeItens, 751, 235.3);
    this.linhaVertical(alturaInicialDoQuadroDeItens, 751, 269.3);
    this.linhaVertical(alturaInicialDoQuadroDeItens, 751, 292);
    this.linhaVertical(alturaInicialDoQuadroDeItens, 751, 314.5);
    this.linhaVertical(alturaInicialDoQuadroDeItens, 751, 331.6);
    this.linhaVertical(alturaInicialDoQuadroDeItens, 751, 371.2);
    this.linhaVertical(alturaInicialDoQuadroDeItens, 751, 405.4);
    this.linhaVertical(alturaInicialDoQuadroDeItens, 751, 439.3);
    this.linhaVertical(alturaInicialDoQuadroDeItens, 751, 473.2);
    this.linhaVertical(alturaInicialDoQuadroDeItens, 751, 507.2);
    this.linhaVertical(alturaInicialDoQuadroDeItens, 751, 535.6);
    this.linhaVertical(alturaInicialDoQuadroDeItens, 751, 555.4);
    this.linhaVertical(
      alturaInicialDoQuadroDeItens,
      751,
      this._pdfDefaults.larguraDoFormulario
    );

    let alturaInicialDoSetimoBloco = 762.2;

    this.linhaHorizontal(0, 0, alturaInicialDoSetimoBloco); // x1, x2, y
    this.linhaHorizontal(0, 0, 821.8);

    this.linhaVertical(alturaInicialDoSetimoBloco, 821.8, 0);
    this.linhaVertical(alturaInicialDoSetimoBloco, 821.8, 388.25);
    this.linhaVertical(
      alturaInicialDoSetimoBloco,
      821.8,
      this._pdfDefaults.larguraDoFormulario
    );

    this.linhaHorizontalTracejada(0, 0, 55.32);

    this.normal(
      [
        "Recebemos de",
        this.danfeProps.documento.emitente.nome,
        "os produtos e/ou serviços constantes da nota",
        "fiscal eletrônica indicada abaixo.",
        "Emissão:",
        this.danfeProps.documento.danfe.dataDaEmissao,
        "- Valor Total:",
        this.danfeProps.documento.danfe.valorTotalDaNota,
        "- Destinatário:",
        this.danfeProps.documento.destinatario.nome,
        "- Endereço:",
        this.danfeProps.documento.destinatario.endereco?.primeiraLinha,
      ]
        .join(" ")
        .toUpperCase(),
      1.5,
      3,
      472.5,
      "justify",
      6.9
    );

    this.titulo("DANFE", 266.5, 63.5, 197, "left", 14);
    this.normal("NF-e", 476.6, 1.8, 110, "center", 14);
    this.normal(
      this.danfeProps.documento.danfe.numero,
      476.6,
      22,
      110,
      "center",
      10
    );
    this.normal(
      this.danfeProps.documento.danfe.serie,
      476.6,
      31.5,
      110,
      "center",
      10
    );

    this.italico("IDENTIFICAÇÃO DO EMITENTE", 1, 60, 238);

    let identificacaoDoEmitenteY = 84,
      identificacaoDoEmitenteX = 1.5,
      identificacaoDoEmitenteLargura = 237, //
      identificacaoDoEmitenteFonte = 1.5;

    this.negrito(
      this.danfeProps.documento.emitente.nome,
      identificacaoDoEmitenteX,
      identificacaoDoEmitenteY +
        this._pdfDefaults.ajusteYDaIdentificacaoDoEmitente,
      identificacaoDoEmitenteLargura,
      "center",
      8 + identificacaoDoEmitenteFonte
    );

    if (this.danfeProps.documento.emitente.endereco?.primeiraLinha) {
      this.normal(
        this.danfeProps.documento.emitente.endereco?.primeiraLinha,
        identificacaoDoEmitenteX,
        this.pdf.y - this._pdfDefaults.margemTopo + 2,
        identificacaoDoEmitenteLargura,
        "center",
        6 + identificacaoDoEmitenteFonte
      );
    }

    if (this.danfeProps.documento.emitente.endereco?.segundaLinha) {
      this.normal(
        this.danfeProps.documento.emitente.endereco?.segundaLinha,
        identificacaoDoEmitenteX,
        this.pdf.y - this._pdfDefaults.margemTopo,
        identificacaoDoEmitenteLargura,
        "center",
        6 + identificacaoDoEmitenteFonte
      );
    }

    let jaAdicionouEspacamento = false;

    if (this.danfeProps.documento.emitente.telefone) {
      jaAdicionouEspacamento = true;

      this.normal(
        "Telefone: " + this.danfeProps.documento.emitente.telefone,
        identificacaoDoEmitenteX,
        this.pdf.y - this._pdfDefaults.margemTopo + 2,
        identificacaoDoEmitenteLargura,
        "center",
        6 + identificacaoDoEmitenteFonte
      );
    }

    if (this.danfeProps.documento.emitente.email) {
      this.normal(
        "Email: " + this.danfeProps.documento.emitente.email,
        identificacaoDoEmitenteX,
        this.pdf.y -
          this._pdfDefaults.margemTopo +
          (jaAdicionouEspacamento ? 0 : 2),
        identificacaoDoEmitenteLargura,
        "center",
        6 + identificacaoDoEmitenteFonte
      );
    }

    this.normal(
      "Documento Auxiliar da Nota Fiscal Eletrônica",
      241.5,
      77,
      99.5
    );

    this.normal("0 - ENTRADA", 248, 100, 99.5, "left");
    this.normal("1 - SAÍDA", 248, 108.5, 99.5, "left");
    this.negrito(
      this.danfeProps.documento.danfe.tipo,
      317.5,
      96.8,
      14.5,
      "center",
      18
    );
  }

  public generatePdf() {}
}
