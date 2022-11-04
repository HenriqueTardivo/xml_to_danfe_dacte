import convert from "xml-js";
import * as fs from "fs";

export function XmlToJsoj(xml: string) {
  const options = { compact: true, ignoreComment: true, spaces: 1 };

  fs.writeFile(`${process.env.CAMINHO_ARQUIVOS}xml_exemplo.xml`, xml, (error) =>
    console.log("erro ao gravar o arquivo " + error)
  );

  const result = convert.xml2json(xml, options);

  fs.writeFile(
    `${process.env.CAMINHO_ARQUIVOS}json_exemplo.json`,
    result,
    (error) => console.log("erro ao gravar o arquivo " + error)
  );

  return JSON.parse(result);
}
