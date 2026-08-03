import type { OpenAPIV3 } from "openapi-types";

/**
 * OpenAPI 3.0 description of the XML → DANFE/DACTE conversion API.
 * Served as interactive docs through Swagger UI at `/docs`.
 */
export const openApiDocument: OpenAPIV3.Document = {
	openapi: "3.0.3",
	info: {
		title: "XML to DANFE/DACTE API",
		version: "2.0.0",
		description:
			"Gera o DANFE (NF-e, modelo 55), o DACTE (CT-e, modelo 57) ou o " +
			"DACTE-OS (CT-e OS, modelo 67) em PDF a partir do XML do documento fiscal.",
		license: { name: "MIT" },
	},
	servers: [{ url: "/", description: "Current server" }],
	tags: [{ name: "Conversion", description: "Conversão de XML fiscal em PDF" }],
	paths: {
		"/": {
			post: {
				tags: ["Conversion"],
				summary: "Converte XML fiscal (NF-e / CT-e / CT-e OS) em PDF",
				description:
					"Recebe o XML bruto no corpo da requisição, detecta o tipo de " +
					"documento pelo namespace e pelo modelo (`<mod>`) e devolve o PDF " +
					"correspondente. Por padrão o PDF volta em base64; use " +
					"`?return_type=download` para receber o arquivo como anexo.",
				security: [{ ApiKeyAuth: [] }],
				parameters: [
					{
						name: "return_type",
						in: "query",
						required: false,
						description:
							"Quando `download`, responde com o PDF binário como anexo. " +
							"Caso contrário, responde com JSON contendo o PDF em base64.",
						schema: { type: "string", enum: ["download"] },
					},
				],
				requestBody: {
					required: true,
					description: "XML bruto da NF-e, CT-e ou CT-e OS.",
					content: {
						"application/xml": {
							schema: { type: "string" },
							example:
								'<nfeProc versao="4.00" xmlns="http://www.portalfiscal.inf.br/nfe">...</nfeProc>',
						},
						"text/plain": {
							schema: { type: "string" },
						},
					},
				},
				responses: {
					"200": {
						description: "PDF gerado com sucesso.",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										kind: {
											type: "string",
											enum: ["danfe", "dacte", "dacteos"],
										},
										pdfBase64: { type: "string" },
									},
								},
							},
							"application/pdf": {
								schema: { type: "string", format: "binary" },
							},
						},
					},
					"400": {
						description: "XML ausente ou inválido.",
						content: {
							"application/json": {
								schema: { $ref: "#/components/schemas/Error" },
							},
						},
					},
					"401": {
						description: "Header de autorização ausente ou inválido.",
						content: {
							"application/json": {
								schema: { $ref: "#/components/schemas/Error" },
							},
						},
					},
					"500": {
						description: "Falha ao gerar o documento.",
						content: {
							"application/json": {
								schema: { $ref: "#/components/schemas/Error" },
							},
						},
					},
				},
			},
		},
	},
	components: {
		securitySchemes: {
			ApiKeyAuth: {
				type: "apiKey",
				in: "header",
				name: "authorization",
				description:
					"Segredo compartilhado. Obrigatório apenas quando a variável de " +
					"ambiente `XML_TO_DANFE_SECRET` está configurada no servidor.",
			},
		},
		schemas: {
			Error: {
				type: "object",
				properties: { error: { type: "string" } },
			},
		},
	},
};
