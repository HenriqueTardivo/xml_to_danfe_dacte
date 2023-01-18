import Pdf from "pdfkit";
import pdfDefaults from "./pdf-defaults";
import { fontes } from "./fontes";

class PdfGenerator {
  public pdf: PDFKit.PDFDocument;
  public _pdfDefaults = pdfDefaults;

  constructor() {
    this.pdf = new Pdf({
      pdfVersion: "1.7",
      bufferPages: true,
      margin: 0,
      size: [
        this._pdfDefaults.larguraDaPagina,
        this._pdfDefaults.alturaDaPagina,
      ],
      info: {
        Author: this._pdfDefaults.autor,
        Title: this._pdfDefaults.titulo,
        Creator: this._pdfDefaults.criador,
        Producer: "https://github.com/HenriqueTardivo",
      },
    });

    this.pdf.registerFont("normal", fontes.timesNewRoman);
    this.pdf.registerFont("negrito", fontes.timesNewRomanNegrito);
    this.pdf.registerFont("italico", fontes.timesNewRomanItalico);
    this.pdf.registerFont(
      "negrito-italico",
      fontes.timesNewRomanNegritoItalico
    );
    this.pdf.registerFont("codigoDeBarras", fontes.codigoDeBarras);

    this.pdf.lineWidth(this._pdfDefaults.grossuraDaLinha);
  }

  public linhaHorizontal(x1: number, x2: number, y: number, cor?: string) {
    y = this._pdfDefaults.margemTopo + this._pdfDefaults.ajusteY + y;
    x1 = this._pdfDefaults.margemEsquerda + this._pdfDefaults.ajusteX + x1;
    x2 = this._pdfDefaults.margemDireita + this._pdfDefaults.ajusteX + x2;

    return this.pdf
      .moveTo(x1, y)
      .lineTo(x2, y)
      .stroke(cor || this._pdfDefaults.corDoLayout);
  }

  public linhaHorizontalTracejada(x1: number, x2: number, y: number) {
    y = this._pdfDefaults.margemTopo + this._pdfDefaults.ajusteY + y;
    x1 = this._pdfDefaults.margemEsquerda + this._pdfDefaults.ajusteX + x1;
    x2 = this._pdfDefaults.margemDireita + this._pdfDefaults.ajusteX + x2;

    return this.pdf
      .moveTo(x1, y)
      .lineTo(x2, y)
      .dash(3, { space: 5 })
      .stroke(this._pdfDefaults.corDoLayout);
  }

  public linhaVertical(y1: number, y2: number, x: number, cor?: string) {
    x = this._pdfDefaults.margemEsquerda + this._pdfDefaults.ajusteX + x;
    y1 = this._pdfDefaults.margemTopo + this._pdfDefaults.ajusteY + y1;
    y2 = this._pdfDefaults.margemTopo + this._pdfDefaults.ajusteY + y2;

    return this.pdf
      .moveTo(x, y1)
      .lineTo(x, y2)
      .stroke(cor || this._pdfDefaults.corDoLayout);
  }

  public secao(
    string: string,
    x: number,
    y: number,
    largura?: number,
    alinhamento?: string,
    tamanho?: number
  ) {
    string = string || "";

    x = this._pdfDefaults.margemEsquerda + this._pdfDefaults.ajusteX + x;
    y = this._pdfDefaults.margemTopo + this._pdfDefaults.ajusteY + y;

    this.pdf
      .font("negrito")
      .fillColor(this._pdfDefaults.corDaSecao)
      .fontSize(tamanho || this._pdfDefaults.tamanhoDaFonteDaSecao)
      .text(string.toUpperCase(), x, y, {
        width: largura,
        align: "left",
      });
  }

  public titulo(
    string: string,
    x: number,
    y: number,
    largura?: number,
    alinhamento?: string,
    tamanho?: number
  ) {
    string =
      (typeof string !== "undefined" && string !== null && string.toString()) ||
      "";

    x = this._pdfDefaults.margemEsquerda + this._pdfDefaults.ajusteX + x;
    y = this._pdfDefaults.margemTopo + this._pdfDefaults.ajusteY + y;

    this.pdf
      .font("normal")
      .fillColor(this._pdfDefaults.corDoTitulo)
      .fontSize(tamanho || this._pdfDefaults.tamanhoDaFonteDoTitulo)
      .text(string.toUpperCase(), x, y, {
        width: largura,
        align: alinhamento || this._pdfDefaults.alinhamentoDoTitulo,
      });
  }

  public normal(
    string: string,
    x: number,
    y: number,
    largura: number,
    alinhamento?: string,
    tamanho?: number,
    _pdf?: PDFKit.PDFDocument
  ) {
    string = string || "";

    (_pdf || this.pdf)
      .font("normal")
      .fillColor(this._pdfDefaults.corDoTitulo)
      .fontSize(tamanho || 8)
      .text(
        string,
        this._pdfDefaults.margemEsquerda + this._pdfDefaults.ajusteX + x,
        this._pdfDefaults.margemTopo + this._pdfDefaults.ajusteY + y,
        {
          width: largura,
          align: alinhamento || "center",
          lineGap: -1.5,
        }
      );
  }

  public italico(
    string: string,
    x: number,
    y: number,
    largura: number,
    alinhamento?: string,
    tamanho?: number
  ) {
    string = string || "";

    this.pdf
      .font("italico")
      .fillColor(this._pdfDefaults.corDoTitulo)
      .fontSize(tamanho || 6)
      .text(
        string,
        this._pdfDefaults.margemEsquerda + this._pdfDefaults.ajusteX + x,
        this._pdfDefaults.margemTopo + this._pdfDefaults.ajusteY + y,
        {
          width: largura,
          align: alinhamento || "center",
          lineGap: -1.5,
        }
      );
  }

  public negrito(
    string: string,
    x: number,
    y: number,
    largura: number,
    alinhamento?: string,
    tamanho?: number
  ) {
    string = string || "";

    this.pdf
      .font("negrito")
      .fillColor(this._pdfDefaults.corDoTitulo)
      .fontSize(tamanho || 6)
      .text(
        string,
        this._pdfDefaults.margemEsquerda + this._pdfDefaults.ajusteX + x,
        this._pdfDefaults.margemTopo + this._pdfDefaults.ajusteY + y,
        {
          width: largura,
          align: alinhamento || "center",
          lineGap: -1.5,
        }
      );
  }

  public campo(
    string: string,
    x: number,
    y: number,
    largura: number,
    alinhamento: string,
    tamanho: number
  ) {
    string = string || "";

    this.pdf
      .font("negrito")
      .fillColor(this._pdfDefaults.corDoCampo)
      .fontSize(tamanho || this._pdfDefaults.tamanhoDaFonteDoCampo)
      .text(
        string,
        this._pdfDefaults.margemEsquerda + this._pdfDefaults.ajusteX + x,
        this._pdfDefaults.margemTopo + this._pdfDefaults.ajusteY + y,
        {
          width: largura,
          align: alinhamento || this._pdfDefaults.alinhamentoDoCampo,
        }
      );
  }
}

export { PdfGenerator };
