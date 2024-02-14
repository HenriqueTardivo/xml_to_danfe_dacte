# XML-TO-DANFE-DACTE
This is an API for generating the "Documento Auxiliar da Nota Fiscal Eletrônica" (DANFE) or the "Documento Auxiliar do Conhecimento de Transporte Eletrônico" (DACTE) from the XML file of the Nota Fiscal Eletrônica (NFe) or Conhecimento de Transporte Eletrônico (CTe).

# Prerequisites
You need Bun.js runtime installed on your machine. This project won't work with Node.js.
To install Bun.js, follow the instructions on the [official website](https://bun.sh/).

# Quick Start
```
git clone https://github.com/DenisBessa/xml_to_danfe_dacte.git
cd xml_to_danfe_dacte
bun install
bun dev
```

# Use example
```
curl --location 'http://localhost:3000' \
--header 'Content-Type: text/plain' \
--data-raw '<nfeProc versao="4.00" xmlns="http://www.portalfiscal.inf.br/nfe"> { ... } </nfeProc>'
```

Replace the `{ ... }` with the XML content. It should be a valid XML file of the NFe or CTe.