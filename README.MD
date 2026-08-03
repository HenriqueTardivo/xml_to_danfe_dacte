# XML-TO-DANFE-DACTE

An HTTP API that generates the **DANFE** (Documento Auxiliar da Nota Fiscal Eletrônica — NF-e, model 55), the **DACTE** (Documento Auxiliar do Conhecimento de Transporte Eletrônico — CT-e, model 57) or the **DACTE-OS** (CT-e OS, model 67) as a PDF, straight from the document's XML.

Built with **Node.js + Express + TypeScript**, with interactive **Swagger** docs.

## Prerequisites

- [Node.js](https://nodejs.org/) 18+ (developed on Node 22)
- npm

## Quick Start

```bash
git clone https://github.com/DenisBessa/xml_to_danfe_dacte.git
cd xml_to_danfe_dacte
npm install
npm run dev
```

The server starts on `http://localhost:3000` (override with the `PORT` env var).

## Scripts

| Script            | Description                                          |
| ----------------- | ---------------------------------------------------- |
| `npm run dev`     | Start in watch mode with `tsx`                       |
| `npm run build`   | Type-check and compile to `dist/` (copies fonts too) |
| `npm start`       | Run the compiled server from `dist/`                 |
| `npm run lint`    | Lint with Biome                                      |
| `npm run format`  | Format with Biome                                    |

## API

### `POST /`

Send the raw XML (NF-e, CT-e or CT-e OS) as the request body. The document type
is detected automatically from the XML namespace and the `<mod>` tag.

```bash
curl --location 'http://localhost:3000' \
  --header 'Content-Type: application/xml' \
  --data-binary @example/danfe.xml
```

Sample XMLs live in the [`example/`](./example) directory.

#### Response types

- **Default** — JSON with the PDF as base64: `{ "kind": "danfe", "pdfBase64": "..." }`
- **Download** — add `?return_type=download` to receive the PDF as a binary attachment.

#### Authentication

If the `XML_TO_DANFE_SECRET` environment variable is set, requests must send a
matching `authorization` header; otherwise the endpoint is open.

### Interactive docs

Swagger UI is served at [`/docs`](http://localhost:3000/docs), and the raw
OpenAPI document at `/openapi.json`.

## Document models

| Model | Document  | Status                                                              |
| ----- | --------- | ------------------------------------------------------------------- |
| 55    | DANFE     | ✅ Supported                                                         |
| 57    | DACTE     | ✅ Supported                                                         |
| 67    | DACTE-OS  | 🚧 Scaffolded — routing/detection in place, XML mapping in progress |

> The DACTE-OS (model 67) generator is wired end-to-end, but its XML → model
> mapping still needs to be completed and validated against a real model-67
> sample. See `src/modules/XMLtoPDF/UseCase/json-to-cteos-use-case.ts`.
