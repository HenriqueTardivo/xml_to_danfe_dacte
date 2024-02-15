import { serve } from "bun";
import { IDaCte } from "src/application/modules/interfaces/IDaCte";
import { INfe } from "src/application/modules/interfaces/INfe";
import { JsonToCTE } from "src/application/modules/XMLtoPDF/UseCase/json-to-cte-use-case";
import { JsonToDanfe } from "src/application/modules/XMLtoPDF/UseCase/json-to-danfe-use-case";
import { xmlToJson } from "src/application/modules/XMLtoPDF/UseCase/xml-to-json";

console.log(`Server running at http://localhost:3000`);

serve({
  async fetch(req: Request) {
    const url = new URL(req.url);

    if (url.pathname === "/" && req.method === "POST") {
      try {
        const xml = await req.text();

        // check if body is a text
        if (typeof xml !== "string" || xml.length === 0) return new Response("Bad Request", { status: 400 });

        // check if xml contains "http://www.portalfiscal.inf.br/nfe"
        const isDanfe = xml.includes("http://www.portalfiscal.inf.br/nfe");
        const isDacte = xml.includes("http://www.portalfiscal.inf.br/cte");

        if (!isDanfe && !isDacte) return new Response("Invalid XML", { status: 400 });

        const json = await xmlToJson(xml);

        const pdfBase64 = isDanfe ? await new JsonToDanfe().jsonToPDF(json as INfe) : await new JsonToCTE().jsonToPDF(json as IDaCte);

        return new Response(JSON.stringify({ pdfBase64 }), {
          headers: { "content-type": "application/json" },
        });
      } catch (error) {
        console.log(error);

        return new Response(error instanceof Error ? JSON.stringify({ error: error.message }) : "Internal Server Error", { status: 500 });
      }
    }

    // Return 404 for all other requests
    return new Response("Not Found", { status: 404 });
  },
});
