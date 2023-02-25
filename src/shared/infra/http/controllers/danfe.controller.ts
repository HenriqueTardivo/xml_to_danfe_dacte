import { INfe } from "./../../../../application/modules/interfaces/INfe";
import { Response, Request } from "express";
import { xmlToJson } from "../../../../application/modules/XMLtoPDF/UseCase/xml-to-json";
import { unlink } from "fs";
import { JsonToDanfe } from "../../../../application/modules/XMLtoPDF/UseCase/json-to-danfe-use-case";

class DanfeController {
  async handle(request: Request, response: Response) {
    try {
      const { nr_chacesso } = request.query;

      const xml = request.body;

      const json = xmlToJson(xml);

      const path = await new JsonToDanfe().jsonToPDF(
        json as INfe,
        nr_chacesso as string
      );

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

export { DanfeController };
