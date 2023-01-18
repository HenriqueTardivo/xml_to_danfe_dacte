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

  tamanhoDaFonteDosItens: 7,
  separadorDeItens: true,

  ajusteYDoLogotipo: 0,
  ajusteYDaIdentificacaoDoEmitente: 0,

  ambiente: "producao",
  opacidadeDaHomologacao: 0.2,
  ajusteYDaHomologacao: 275,

  grossuraDaLinha: 0.5,
  margemTopo: 2.8,
  margemEsquerda: 3,
  margemDireita: 589.65,
  larguraDoFormulario: 586.65,

  tamanhoDoCodigoDeBarras: 32,
  corDoLayout: "black",
  larguraDaPagina: 595.28,
  alturaDaPagina: 841.89,
  creditos: "Desenvolvido por Henrique Tardivo",
};

export default pdfDefaults;
