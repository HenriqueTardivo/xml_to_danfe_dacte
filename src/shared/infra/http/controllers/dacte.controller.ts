import { unlink } from "fs";
import { Response, Request } from "express";
import { IDaCte } from "./../../../../application/modules/interfaces/ICte";
import { xmlToJson } from "../../../../application/modules/XMLtoPDF/UseCase/xml-to-json";
import { JsonToCTE } from "../../../../application/modules/XMLtoPDF/UseCase/json-to-cte-use-case";

class DacteController {
  async handle(request: Request, response: Response) {
    try {
      const { nr_chacesso } = request.query;

      const xml = request.body;

      const json = xmlToJson(xml);

      const path = await new JsonToCTE().jsonToPDF(
        json as IDaCte,
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

export { DacteController };
