export interface INfe {
  nfeProc?: INFe;
}

export interface Ivalor {
  _text: string;
}

interface INFe {
  NFe: InfePai;
  protNFe: IprotNFe;
}

interface InfePai {
  infNFe: IinfNFe;
  Signature: Isignature;
}

interface IinfNFe {
  ide: Iide;
  emit: Iemit;
  dest: Idest;
  entrega: Ientrega;
  det: Idet;
  total: Itotal;
  transp: Itransp;
  cobr: ICobr;
  pag: Ipag;
  infAdic: IInfAdic;
}

interface IInfAdic {
  infAdFisco: Ivalor;
  infCpl: Ivalor;
  obsCont: Ivalor;
  obsFisco: Ivalor;
  procRef: Ivalor;
}

interface ICobr {
  fat: Ifatura;
  dup: Iduplicata;
}

interface Ifatura {
  nFat: Ivalor;
  vOrig: Ivalor;
  vDesc: Ivalor;
  vLiq: Ivalor;
}

export interface Iduplicata {
  nDup: Ivalor;
  dVenc: Ivalor;
  vDup: Ivalor;
}

interface IprotNFe {
  infProt: IinfProt;
}

export interface IinfProt {
  tpAmb: Ivalor;
  verAplic: Ivalor;
  chNFe: Ivalor;
  chCTe: Ivalor;
  dhRecbto: Ivalor;
  nProt: Ivalor;
  digVal: Ivalor;
  cStat: Ivalor;
  xMotivo: Ivalor;
}

export interface Isignature {
  SignedInfo: IsignedInfo;
  SignatureValue: Ivalor;
  KeyInfo: IkeyInfo;
}

export interface IsignedInfo {
  CanonicalizationMethod: Ivalor;
  SignatureMethod: Ivalor;
  Reference: Ireference;
}

export interface Ireference {
  Transforms: Ivalor;
  DigestMethod: Ivalor;
  DigestValue: Ivalor;
}

interface IkeyInfo {
  X509Data: Ix509Data;
}

interface Ix509Data {
  X509Certificate: Ivalor;
}

interface Itotal {
  ICMSTot: IcmsTot;
}

interface Ipag {
  detPag: IdetPag;
}

export interface IdetPag {
  indPag: Ivalor;
  tPag: Ivalor;
  xPag: Ivalor;
  vPag: Ivalor;
}

interface Itransp {
  modFrete: Ivalor;
  transporta: ITransporta;
  veicTransp: IveicTransp;
  vol: Ivol;
}

interface ITransporta {
  CNPJ: Ivalor;
  xNome: Ivalor;
  IE: Ivalor;
  xEnder: Ivalor;
  xMun: Ivalor;
  UF: Ivalor;
}

interface IveicTransp {
  placa: Ivalor;
  UF: Ivalor;
}

interface Ivol {
  qVol: Ivalor;
  esp: Ivalor;
  pesoL: Ivalor;
  pesoB: Ivalor;
  marca: Ivalor;
}

interface IcmsTot {
  vBC: Ivalor;
  vII: Ivalor;
  vICMS: Ivalor;
  vICMSDeson: Ivalor;
  vICMSUFDest: Ivalor;
  vICMSUFRemet: Ivalor;
  vTotTrib: Ivalor;
  vFCP: Ivalor;
  vBCST: Ivalor;
  vST: Ivalor;
  vFCPST: Ivalor;
  vFCPSTRet: Ivalor;
  vProd: Ivalor;
  vFrete: Ivalor;
  vSeg: Ivalor;
  vDesc: Ivalor;
  vIPI: Ivalor;
  vIPIDevol: Ivalor;
  vPIS: Ivalor;
  vCOFINS: Ivalor;
  vOutro: Ivalor;
  vNF: Ivalor;
  vServ: Ivalor;
}

export interface Idet {
  prod: Iprod;
  imposto: Iimposto;
}

export interface Iimposto {
  ICMS: Iicms;
  II: Iimportacao;
  IPI: Iipi;
  PIS: Ipis;
  COFINS: Iconfins;
}
interface Iimportacao {
  vII: Ivalor;
}
interface Ipis {
  PISOutr: IpisOutr;
}

interface IpisOutr {
  CST: Ivalor;
  vBC: Ivalor;
  pPIS: Ivalor;
  vPIS: Ivalor;
}

interface Iconfins {
  COFINSOutr: IconfinsOutr;
}

interface IconfinsOutr {
  CST: Ivalor;
  vBC: Ivalor;
  pCOFINS: Ivalor;
  vCOFINS: Ivalor;
}

interface Iipi {
  cEnq: Ivalor;
  IPITrib: Ipitrib;
}

interface Ipitrib {
  CST: Ivalor;
  vBC: Ivalor;
  pIPI: Ivalor;
  vIPI: Ivalor;
}

export interface Iicms {
  ICMSgenerico: Icms_generico;
}

export interface Icms_generico {
  orig: Ivalor;
  CST: Ivalor;
  modBC: Ivalor;
  pRedBC: Ivalor;
  vBC: Ivalor;
  pICMS: Ivalor;
  vICMS: Ivalor;
  pICMSST: Ivalor;
  vICMSST: Ivalor;
}
interface Iprod {
  cProd: Ivalor;
  cEAN: Ivalor;
  xProd: Ivalor;
  NCM: Ivalor;
  CEST: Ivalor;
  indEscala: Ivalor;
  CFOP: Ivalor;
  uCom: Ivalor;
  qCom: Ivalor;
  vUnCom: Ivalor;
  vProd: Ivalor;
  cEANTrib: Ivalor;
  uTrib: Ivalor;
  qTrib: Ivalor;
  vUnTrib: Ivalor;
  indTot: Ivalor;
  vFrete: Ivalor;
  vSeg: Ivalor;
  vDesc: Ivalor;
}

interface Ientrega {
  CNPJ: Ivalor;
  xNome: Ivalor;
  xLgr: Ivalor;
  nro: Ivalor;
  xBairro: Ivalor;
  cMun: Ivalor;
  xMun: Ivalor;
  UF: Ivalor;
  CEP: Ivalor;
  fone: Ivalor;
}

export interface Idest {
  CNPJ: Ivalor;
  xNome: Ivalor;
  enderDest: IenderDest;
  indIEDest: Ivalor;
  IE: Ivalor;
  email: Ivalor;
  fone: Ivalor;
}

export interface IenderDest {
  xLgr: Ivalor;
  nro: Ivalor;
  xCpl: Ivalor;
  xBairro: Ivalor;
  cMun: Ivalor;
  xMun: Ivalor;
  UF: Ivalor;
  CEP: Ivalor;
  cPais: Ivalor;
  xPais: Ivalor;
  fone: Ivalor;
}

export interface Iemit {
  CNPJ: Ivalor;
  xNome: Ivalor;
  xFant: Ivalor;
  enderEmit: Ienderemit;
  IE: Ivalor;
  CRT: Ivalor;
  IEST: Ivalor;
}

interface Ienderemit {
  xLgr: Ivalor;
  nro: Ivalor;
  xCpl: Ivalor;
  xBairro: Ivalor;
  cMun: Ivalor;
  xMun: Ivalor;
  UF: Ivalor;
  CEP: Ivalor;
  cPais: Ivalor;
  xPais: Ivalor;
  fone: Ivalor;
  email: Ivalor;
}

interface Iide {
  cUF: Ivalor;
  cNF: Ivalor;
  natOp: Ivalor;
  mod: Ivalor;
  serie: Ivalor;
  nNF: Ivalor;
  dhEmi: Ivalor;
  dEmi: Ivalor;
  tpNF: Ivalor;
  idDest: Ivalor;
  cMunFG: Ivalor;
  tpImp: Ivalor;
  tpEmis: Ivalor;
  cDV: Ivalor;
  tpAmb: Ivalor;
  finNFe: Ivalor;
  indFinal: Ivalor;
  indPres: Ivalor;
  indIntermed: Ivalor;
  procEmi: Ivalor;
  verProc: Ivalor;
  dhSaiEnt: Ivalor;
}
