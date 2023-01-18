import convert from "xml-js";
import * as fs from "fs";
import { filePath } from "./filePath";

export function xmlToJson(xml: string) {
  const options = { compact: true, ignoreComment: true, spaces: 1 };

  fs.writeFile(
    `${filePath}\\xml_exemplo.xml`,
    xml,
    (error) => error && console.log("erro ao gravar o arquivo " + error)
  );

  const result = convert.xml2json(xml, options);

  fs.writeFile(
    `${filePath}\\json_exemplo.json`,
    result,
    (error) => error && console.log("erro ao gravar o arquivo " + error)
  );

  return JSON.parse(result);
}
