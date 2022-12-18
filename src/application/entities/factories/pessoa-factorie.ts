import { PessoaProps } from "application/entities/pessoa";

export function makePessoaProps(props: PessoaProps) {
  return {
    email: props.email,
    endereco: props.endereco,
    inscricaoEstadual: props.inscricaoEstadual,
    nome: props.nome,
    registroNacional: props.registroNacional,
    telefone: props.telefone,
  };
}
