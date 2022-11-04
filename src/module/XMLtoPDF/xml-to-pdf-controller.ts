import { Response, Request } from "express";
import { XmlToJsoj } from "./UseCase/xml-to-json";
import { JsonToPdf } from "./UseCase/json-to-pdf";
import { unlink } from "fs";

class XMLtoPDFController {
  async handle(request: Request, response: Response) {
    try {
      const { tipoNota, nr_chacesso } = request.query;

      const xml = request.body;

      if (typeof nr_chacesso !== "string") {
        return response
          .status(500)
          .json({ message: "Chave de acesso não informada " });
      }

      if (!(tipoNota === "NFE" || tipoNota === "CTE")) {
        return response.status(500).json({ message: "Tipo da nota inválido!" });
      }

      if (xml.length < 100) {
        return response.status(404).json({ message: "XML da nota é invalido" });
      }

      const json = XmlToJsoj(xml);

      const path = await JsonToPdf({
        json,
        tipoNota,
        nr_chacesso,
      });

      setTimeout(() => {
        return response.download(path, (err) => {
          if (err) {
            console.log("Erro no envio: " + err);
          }

          unlink(path, (error) => {
            if (error) {
              console.log("Erro ao deletar: " + error);
            }
          });
        });
      }, 600);
    } catch (error) {
      return response
        .status(500)
        .json({ message: "Erro na requisição " + error });
    }
  }
}

export { XMLtoPDFController };
