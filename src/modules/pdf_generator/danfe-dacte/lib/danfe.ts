import CteInfo from "@/modules/pdf_generator/danfe-dacte/lib/cteInfo";
import Destinatario from "@/modules/pdf_generator/danfe-dacte/lib/destinatario";
import type Duplicata from "@/modules/pdf_generator/danfe-dacte/lib/duplicata";
import Emitente from "@/modules/pdf_generator/danfe-dacte/lib/emitente";
import Expeditor from "@/modules/pdf_generator/danfe-dacte/lib/expeditor";
import type Fatura from "@/modules/pdf_generator/danfe-dacte/lib/fatura";
import type FormularioDeSeguranca from "@/modules/pdf_generator/danfe-dacte/lib/formularioDeSeguranca";
import Impostos from "@/modules/pdf_generator/danfe-dacte/lib/impostos";
import type Item from "@/modules/pdf_generator/danfe-dacte/lib/item";
import Protocolo from "@/modules/pdf_generator/danfe-dacte/lib/protocolo";
import Recebedor from "@/modules/pdf_generator/danfe-dacte/lib/recebedor";
import Transportador from "@/modules/pdf_generator/danfe-dacte/lib/transportador";
import Volumes from "@/modules/pdf_generator/danfe-dacte/lib/volumes";

type Maybe = string | undefined;
type Valor = string | number | undefined;
type Orientacao = "retrato" | "paisagem";

export default class Danfe {
	_orientacao!: Orientacao;
	_emitente!: Emitente;
	_destinatario!: Destinatario;
	_transportador!: Transportador;
	_protocolo!: Protocolo;
	_impostos!: Impostos;
	_volumes!: Volumes;
	_expeditor!: Expeditor;
	_recebedor!: Recebedor;
	_cteInfo!: CteInfo;
	_itens: Item[];
	_formularioDeSeguranca?: FormularioDeSeguranca;
	_fatura?: Fatura;
	_duplicatas?: Duplicata[];
	_informacoesComplementares?: string;
	_valorTotalDaNota?: Valor;
	_valorTotalDosProdutos?: Valor;
	_valorTotalDosServicos?: Valor;
	_inscricaoEstadualDoSubstitutoTributario?: string;
	_valorDoFrete?: Valor;
	_valorDoSeguro?: Valor;
	_desconto?: Valor;
	_outrasDespesas?: Valor;
	_tipo?: string;
	_numero?: number;
	_serie?: string;
	_chaveDeAcesso?: string;
	_dataDaEmissao?: string;
	_dataDaEntradaOuSaida?: string;
	_horarioEntradaSaida?: string;
	_modalidadeDoFrete?: string;
	_naturezaDaOperacao?: string;

	constructor() {
		this.comOrientacao("retrato");
		this.comEmitente(new Emitente());
		this.comDestinatario(new Destinatario());
		this.comTransportador(new Transportador());
		this.comProtocolo(new Protocolo());
		this.comImpostos(new Impostos());
		this.comVolumes(new Volumes());
		this.comExpeditor(new Expeditor());
		this.comRecebedor(new Recebedor());
		this.comCteInfo(new CteInfo());
		this._itens = [];
	}
	getProtocolo(): Protocolo {
		return this._protocolo;
	}
	comProtocolo(_protocolo: Protocolo): this {
		this._protocolo = _protocolo;
		return this;
	}
	getFormularioDeSeguranca(): FormularioDeSeguranca | undefined {
		return this._formularioDeSeguranca;
	}
	comFormularioDeSeguranca(_formularioDeSeguranca: FormularioDeSeguranca): this {
		_formularioDeSeguranca.comDanfe(this);
		this._formularioDeSeguranca = _formularioDeSeguranca;
		return this;
	}
	getEmitente(): Emitente {
		return this._emitente;
	}
	comExpeditor(_expeditor: Expeditor): this {
		this._expeditor = _expeditor;
		return this;
	}
	comRecebedor(_recebedor: Recebedor): this {
		this._recebedor = _recebedor;
		return this;
	}
	getExpeditor(): Expeditor {
		return this._expeditor;
	}
	getRecebedor(): Recebedor {
		return this._recebedor;
	}
	comEmitente(_emitente: Emitente): this {
		this._emitente = _emitente;
		return this;
	}
	getDestinatario(): Destinatario {
		return this._destinatario;
	}
	comDestinatario(_destinatario: Destinatario): this {
		this._destinatario = _destinatario;
		return this;
	}
	getTransportador(): Transportador {
		return this._transportador;
	}
	comTransportador(_transportador: Transportador): this {
		this._transportador = _transportador;
		return this;
	}
	getImpostos(): Impostos {
		return this._impostos;
	}
	comImpostos(_impostos: Impostos): this {
		this._impostos = _impostos;
		return this;
	}
	adicionarItem(_item: Item): this {
		this._itens.push(_item);
		return this;
	}
	getFatura(): Fatura | undefined {
		return this._fatura;
	}
	comFatura(_fatura: Fatura): this {
		this._fatura = _fatura;
		return this;
	}
	getDuplicatas(): Duplicata[] {
		return this._duplicatas || [];
	}
	comDuplicatas(_duplicatas: Duplicata[]): this {
		this._duplicatas = _duplicatas;
		return this;
	}
	adicionarDuplicata(duplicata: Duplicata): this {
		if (!this._duplicatas) {
			this._duplicatas = [];
		}
		this._duplicatas.push(duplicata);
		return this;
	}
	getItens(): Item[] {
		return this._itens;
	}
	comItens(_itens: Item[]): this {
		this._itens = _itens;
		return this;
	}
	getInformacoesComplementares(): string {
		return this._informacoesComplementares || "";
	}
	comInformacoesComplementares(_informacoesComplementares: Maybe): this {
		if (!_informacoesComplementares) {
			return this;
		}
		this._informacoesComplementares = _informacoesComplementares.toString();
		return this;
	}
	getValorTotalDaNota(): Valor {
		return this._valorTotalDaNota || 0;
	}
	getValorTotalDaNotaFormatado(_simbolo?: unknown): Valor {
		return this.getValorTotalDaNota();
	}
	comValorTotalDaNota(_valorTotalDaNota: Valor): this {
		this._valorTotalDaNota = _valorTotalDaNota;
		return this;
	}
	getValorTotalDosProdutos(): Valor {
		return this._valorTotalDosProdutos || 0;
	}
	getValorTotalDosProdutosFormatado(): Valor {
		return this.getValorTotalDosProdutos();
	}
	comValorTotalDosProdutos(_valorTotalDosProdutos: Valor): this {
		this._valorTotalDosProdutos = _valorTotalDosProdutos;
		return this;
	}
	getValorTotalDosServicos(): Valor {
		return this._valorTotalDosServicos || 0;
	}
	getValorTotalDosServicosFormatado(): Valor {
		return this.getValorTotalDosServicos();
	}
	comValorTotalDosServicos(_valorTotalDosServicos: Valor): this {
		this._valorTotalDosServicos = _valorTotalDosServicos;
		return this;
	}
	getOrientacao(): Orientacao {
		return this._orientacao;
	}
	comOrientacao(_orientacao: string): this {
		if (["retrato", "paisagem"].indexOf(_orientacao) === -1) {
			throw new Error(
				'Os valores permitidos são as strings "retrato" e "paisagem"',
			);
		}
		this._orientacao = _orientacao as Orientacao;
		return this;
	}
	getInscricaoEstadualDoSubstitutoTributario(): string {
		return this._inscricaoEstadualDoSubstitutoTributario || "";
	}
	// NOTE: legacy behaviour preserved — this setter never stored the value, so
	// the substituto-tributário IE is always rendered empty. Changing it would
	// alter the existing DANFE output.
	comInscricaoEstadualDoSubstitutoTributario(
		_inscricaoEstadualDoSubstitutoTributario: Maybe,
	): this {
		return this;
	}
	getValorDoFrete(): Valor {
		return this._valorDoFrete || 0;
	}
	getValorDoFreteFormatado(): Valor {
		return this.getValorDoFrete();
	}
	comValorDoFrete(_valorDoFrete: Valor): this {
		this._valorDoFrete = _valorDoFrete;
		return this;
	}
	getValorDoSeguro(): Valor {
		return this._valorDoSeguro || 0;
	}
	getValorDoSeguroFormatado(): Valor {
		return this.getValorDoSeguro();
	}
	comValorDoSeguro(_valorDoSeguro: Valor): this {
		this._valorDoSeguro = _valorDoSeguro;
		return this;
	}
	getDesconto(): Valor {
		return this._desconto || 0;
	}
	getDescontoFormatado(): Valor {
		return this.getDesconto();
	}
	comDesconto(_desconto: Valor): this {
		this._desconto = _desconto;
		return this;
	}
	getOutrasDespesas(): Valor {
		return this._outrasDespesas || 0;
	}
	getOutrasDespesasFormatado(): Valor {
		return this.getOutrasDespesas();
	}
	comOutrasDespesas(_outrasDespesas: Valor): this {
		this._outrasDespesas = _outrasDespesas;
		return this;
	}
	getTipo(): string | undefined {
		return this._tipo;
	}
	getTipoFormatado(): string | undefined {
		return this.getTipo();
	}
	comTipo(_tipo: Maybe): this {
		this._tipo = _tipo;
		return this;
	}
	getNumero(): number | undefined {
		return this._numero;
	}
	getNumeroFormatado(): string {
		return `Nº. ${this.getNumero()}`;
	}
	comNumero(_numero: string | number | undefined): this {
		const numero = Number.parseInt(_numero as string, 10);

		if (Number.isNaN(numero)) {
			throw new Error(`Não é um número válido. Valor encontrado: ${numero}`);
		}

		if (numero < 1 || numero > 999999999) {
			throw new Error("O número deve ser um valor entre 1 e 999.999.999");
		}

		this._numero = numero;
		return this;
	}
	getSerie(): string | undefined {
		return this._serie;
	}
	getSerieFormatada(): string {
		return `SÉRIE ${this.getSerie()}`;
	}
	comSerie(_serie: Maybe): this {
		this._serie = _serie;
		return this;
	}
	getChaveDeAcesso(): string {
		return this._chaveDeAcesso || "";
	}
	getChaveDeAcessoFormatada(): string {
		return this.getChaveDeAcesso();
	}
	comChaveDeAcesso(_chaveDeAcesso: Maybe): this {
		this._chaveDeAcesso = _chaveDeAcesso;
		return this;
	}
	getDataDaEmissao(): string | undefined {
		return this._dataDaEmissao;
	}
	getDataDaEmissaoFormatada(): string {
		if (this.getDataDaEmissao()) {
			return this.getDataDaEmissao() as string;
		}
		return "";
	}
	comDataDaEmissao(_dataDaEmissao: Maybe): this {
		this._dataDaEmissao = _dataDaEmissao;
		return this;
	}
	getDataDaEntradaOuSaida(): string | undefined {
		return this._dataDaEntradaOuSaida;
	}
	getDataDaEntradaOuSaidaFormatada(): string {
		if (this.getDataDaEntradaOuSaida()) {
			return this.getDataDaEntradaOuSaida() as string;
		}
		return "";
	}
	getHorarioDaEntradaOuSaida(): string {
		return this._horarioEntradaSaida || "";
	}
	comHorarioEntradaSaida(_horarioEntradaSaida: Maybe): this {
		this._horarioEntradaSaida = _horarioEntradaSaida;
		return this;
	}
	comDataDaEntradaOuSaida(_dataDaEntradaOuSaida: Maybe): this {
		this._dataDaEntradaOuSaida = _dataDaEntradaOuSaida;
		return this;
	}
	getVolumes(): Volumes {
		return this._volumes;
	}
	comVolumes(_volumes: Volumes): this {
		this._volumes = _volumes;
		return this;
	}
	getModalidadeDoFrete(): string | undefined {
		return this._modalidadeDoFrete;
	}
	comModalidadeDoFrete(_modalidadeDoFrete: Maybe): this {
		this._modalidadeDoFrete = _modalidadeDoFrete;
		return this;
	}
	getModalidadeDoFreteFormatada(): string {
		return (
			{
				9: "(9) Sem Frete",
				0: "(0) Emitente",
				1: "(1) Dest/Rem",
				2: "(2) Terceiros",
				3: "(3) T.Próp Rem",
				4: "(4) T.Próp Dest",
			}[this.getModalidadeDoFrete() as unknown as number] || ""
		);
	}
	getNaturezaDaOperacao(): string {
		return this._naturezaDaOperacao || "";
	}
	comNaturezaDaOperacao(_naturezaDaOperacao: Maybe): this {
		this._naturezaDaOperacao = _naturezaDaOperacao;
		return this;
	}
	// MÓDULOS CRIADOS PRA CAMPOS DACTE
	comCteInfo(_cteInfo: CteInfo): this {
		this._cteInfo = _cteInfo;
		return this;
	}
	getCteInfo(): CteInfo {
		return this._cteInfo;
	}
}
