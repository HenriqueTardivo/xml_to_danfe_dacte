import { resolve } from "path";

const filePath =
  process.env.CAMINHO_ARQUIVOS || resolve(__dirname, "..", "..", "..", "files");

export { filePath };
