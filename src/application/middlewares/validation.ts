import { NextFunction, Request, Response } from "express";

export function validationMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { nr_chacesso } = request.query;

  const xml = request.body;

  if (!nr_chacesso) {
    return response
      .status(500)
      .json({ message: "Chave de acesso não informada " });
  }

  if (xml.length < 100) {
    return response.status(404).json({ message: "XML da nota é invalido" });
  }

  return next();
}
