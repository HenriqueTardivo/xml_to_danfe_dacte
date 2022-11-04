import { IDaCte } from "./../../../interfaces/ICte";
import { INfe } from "./../../../interfaces/INfe";
import { JsonToDanfe } from "./json-to-danfe-use-case";
import { JsonToCTE } from "./json-to-cte-use-case";

interface Props {
  json: IDaCte | INfe;
  tipoNota: "NFE" | "CTE";
  nr_chacesso: string;
}

export async function JsonToPdf(props: Props): Promise<string> {
  switch (props.tipoNota) {
    case "NFE":
      return await new JsonToDanfe().jsonToPDF(
        props.json as INfe,
        props.nr_chacesso
      );
    case "CTE":
      return await new JsonToCTE().jsonToPDF(
        props.json as IDaCte,
        props.nr_chacesso
      );
    default:
      return "ERRO";
  }
}
