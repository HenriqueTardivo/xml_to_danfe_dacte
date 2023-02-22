class MaskFields {
  public static maskCnpj(cnpj: string | undefined): string {
    if (!cnpj) return "";

    return cnpj.replace(
      /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
      "$1.$2.$3/$4-$5"
    );
  }

  public static maskIE(ie: string | undefined): string {
    if (!ie) return "";

    return ie.replace(/(\d{3})?(\d{3})?(\d{3})?(\d{4})/, "$1.$2.$3-$4");
  }

  public static maskCEP(cep: string | undefined): string {
    if (!cep) return "";

    return cep.replace(/^([\d]{2})\.*([\d]{3})-*([\d]{3})/, "$1.$2-$3");
  }

  public static maskNumber(number: string | number | undefined): string {
    if (number) {
      return "0,00";
    }

    return String(
      new Intl.NumberFormat("pt-BR", { minimumFractionDigits: 2 }).format(
        Number(number)
      )
    );
  }

  public static maskDate(data: string | undefined): string {
    if (!data) {
      return "";
    }

    if (data.length > 10) data = data.replace(/-/g, "/");

    return String(new Intl.DateTimeFormat("pt-br").format(new Date(data)));
  }

  public static maskTime(data: string | undefined): string {
    if (!data) return "";

    if (data.length > 19) data = data.slice(0, 19);

    return String(
      new Intl.DateTimeFormat("pt-br", {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      }).format(new Date(data))
    );
  }

  public static maskDateTime(data: string | undefined): string {
    if (!data) return "";

    if (data.length > 10) data = data.replace(/-/g, "/");

    return String(
      new Intl.DateTimeFormat("pt-br", {
        dateStyle: "short",
        timeStyle: "medium",
      }).format(new Date(data))
    );
  }

  public static maskTelefone(telefone: string | undefined): string {
    if (!telefone) return "";

    return telefone.replace(/^(\d{2})(\d{5})(\d{4})/, "($1)$2-$3");
  }
}

export { MaskFields };
