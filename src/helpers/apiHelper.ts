import { NextRequest, NextResponse } from "next/server";

export const CreateResponseFormat = (): [
  error: string,
  message: string,
  data: any[] | any,
  status: number
] => {
  const error = "";
  const message = "";
  const data: any[] = [];
  const status = 200;
  return [error, message, data, status];
};

export const ResponseHandler = (
  error: string,
  message: string,
  data: any[],
  status: number
) => {
  const result = data ? data : [];
  return NextResponse.json({ error, message, result }, { status });
};

export const paramGetter = (req: NextRequest): string => {
  const params = req.url.split("/");
  return params[params.length - 1];
};
