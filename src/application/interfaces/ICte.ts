import { Iemit, Idest, Isignature, Ivalor, IenderDest, IinfProt } from "./INfe";

export interface IDaCte {
  cteProc?: IcteProc;
}
interface IcteProc {
  CTe?: ICte;
  protCTe?: IprotCTe;
}
interface ICte {
  infCte: IinfCte;
  infCTeSupl: IinfCTeSupl;
  Signature: Isignature;
}

interface IinfCte {
  ide: Iide;
  compl: Icompl;
  emit: Iemit;
  rem: Irem;
  dest: Idest;
  exped: IExped;
  receb: IReceb;
  vPrest: Ivprest;
  imp: Iimp;
  infCTeNorm: IinfCTeNorm;
  infRespTec: IinfRespTec;
}
interface IExped {
  CNPJ: Ivalor;
  xNome: Ivalor;
  xFant: Ivalor;
  enderExped: IenderDest;
  IE: Ivalor;
  CRT: Ivalor;
  IEST: Ivalor;
  fone: Ivalor;
}

interface IReceb {
  CNPJ: Ivalor;
  xNome: Ivalor;
  xFant: Ivalor;
  enderReceb: IenderDest;
  IE: Ivalor;
  CRT: Ivalor;
  IEST: Ivalor;
  fone: Ivalor;
}

interface Iide {
  cUF: Ivalor;
  cCT: Ivalor;
  CFOP: Ivalor;
  natOp: Ivalor;
  mod: Ivalor;
  serie: Ivalor;
  nCT: Ivalor;
  dhEmi: Ivalor;
  tpImp: Ivalor;
  tpEmis: Ivalor;
  cDV: Ivalor;
  tpAmb: Ivalor;
  tpCTe: Ivalor;
  procEmi: Ivalor;
  verProc: Ivalor;
  cMunEnv: Ivalor;
  xMunEnv: Ivalor;
  UFEnv: Ivalor;
  modal: Ivalor;
  tpServ: Ivalor;
  cMunIni: Ivalor;
  xMunIni: Ivalor;
  UFIni: Ivalor;
  cMunFim: Ivalor;
  xMunFim: Ivalor;
  UFFim: Ivalor;
  retira: Ivalor;
  indIEToma: Ivalor;
  toma3: Itoma3;
}

interface Itoma3 {
  toma: Ivalor;
}

interface IprotCTe {
  infProt: IinfProt;
}

interface Icompl {
  Entrega: Ientrega;
  xObs: Ivalor;
  ObsCont: IObsContItem;
  ObsFisco: IObsContItem;
}

interface IObsContItem {
  xTexto: Ivalor;
}

interface Ientrega {
  semData: IsemData;
  semHora: IsemHora;
}

interface IsemData {
  tpPer: Ivalor;
}

interface IsemHora {
  tpHor: Ivalor;
}

interface Irem {
  CNPJ: Ivalor;
  IE: Ivalor;
  xNome: Ivalor;
  xFant: Ivalor;
  fone: Ivalor;
  enderReme: IenderDest;
}

interface Ivprest {
  vTPrest: Ivalor;
  vRec: Ivalor;
  Comp: IComp;
}

interface IComp {
  xNome: Ivalor;
  vComp: Ivalor;
}

interface Iimp {
  ICMS: Icms;
  infAdFisco: Ivalor;
  vTotTrib: Ivalor;
  pRedBC: Ivalor;
}

interface Icms {
  Icms_generico: Icms_generico;
  CST: Ivalor;
  indSN: Ivalor;
}

export interface Icms_generico {
  CST: Ivalor;
  vBC: Ivalor;
  pICMS: Ivalor;
  vICMS: Ivalor;
  vICMSSTRet: Ivalor;
  vBCSTRet: Ivalor;
  pICMSSTRet: Ivalor;
  vBCOutraUF: Ivalor;
  pICMSOutraUF: Ivalor;
  vICMSOutraUF: Ivalor;
}

interface IinfCTeNorm {
  infCarga: IinfCarga;
  infDoc: IinfDoc;
  infModal: IinfModal;
}

interface IinfModal {
  rodo: Irodo;
}

interface Irodo {
  RNTRC: Ivalor;
  CIOT: Ivalor;
  dPrev: Ivalor;
}

export interface IinfDoc {
  infNFe: IinfNFe;
}

export interface IinfNFe {
  chave: Ivalor;
}

interface IinfCarga {
  vCarga: Ivalor;
  proPred: Ivalor;
  xOutCat: Ivalor;
  vCargaAverb: Ivalor;
  infQ: IinfQitem;
}

export interface IinfQitem {
  cUnid: Ivalor;
  tpMed: Ivalor;
  qCarga: Ivalor;
}

interface IinfRespTec {
  CNPJ: Ivalor;
  xContato: Ivalor;
  email: Ivalor;
  fone: Ivalor;
}

interface IinfCTeSupl {
  qrCodCTe: Ivalor;
}
