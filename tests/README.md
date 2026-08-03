# Testes

```bash
npm test              # roda tudo (test runner nativo do Node via tsx)
npm run test:golden   # regrava as assinaturas do golden
```

## O que cada arquivo protege

| Arquivo | Ponto-chave |
| --- | --- |
| `pdf-golden.test.ts` | O PDF gerado continua byte a byte igual ao aprovado, para os três documentos. É a rede principal contra efeito colateral de layout. |
| `xml-to-pdf.service.test.ts` | Detecção do tipo de documento (NF-e / CT-e / CT-e OS), PDF completo (`%PDF-` … `%%EOF`) e erro de XML inválido virando rejeição. |
| `campos-do-xml.test.ts` | Leitores do XML, incluindo os casos de borda que o layout depende (`0,00`, string vazia, `String(undefined)`). |
| `builders.test.ts` | Todo setter `com*` devolve `this` (a cadeia dos use-cases quebra se não) e os setters legados no-op continuam no-op. |

## Golden

As fixtures em `tests/fixtures/` são **cópias próprias**, independentes de
`example/` — assim editar os exemplos para testar algo à mão não quebra os
testes. `cteos.xml` é sintético e mínimo, só para manter o caminho do modelo 67
exercitado enquanto não há um XML real.

`golden/assinaturas.json` guarda o sha256 do PDF com data de criação, `/ID` e
UUIDs zerados. Quando falhar:

1. gere o PDF antes e depois da sua mudança e **compare visualmente**;
2. se a diferença for intencional, rode `npm run test:golden` e commite o
   `assinaturas.json` junto com a mudança, explicando no commit o que mudou no
   documento.

Regravar o golden sem olhar o PDF anula o propósito do teste.
