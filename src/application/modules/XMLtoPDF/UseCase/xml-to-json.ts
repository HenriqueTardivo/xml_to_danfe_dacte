import convert from "xml-js";

export function xmlToJson(xml: string) {
  const options = { compact: true, ignoreComment: true, spaces: 1 };

  const result = convert.xml2json(xml, options);

  return JSON.parse(result);
}
