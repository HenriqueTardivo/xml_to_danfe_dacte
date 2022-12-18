import { join } from "path";

const fontes = {
  timesNewRoman: join(__dirname, "Times New Roman.ttf"),
  timesNewRomanNegrito: join(__dirname, "Times New Roman Bold.ttf"),
  timesNewRomanItalico: join(__dirname, "Times New Roman Italic.ttf"),
  timesNewRomanNegritoItalico: join(
    __dirname,
    "Times New Roman Bold Italic.ttf"
  ),
  codigoDeBarras: join(__dirname, "code128.ttf"),
};

export { fontes };
