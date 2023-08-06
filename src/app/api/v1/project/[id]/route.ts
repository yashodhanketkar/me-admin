import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import {
  CreateResponseFormat,
  ResponseHandler,
  paramGetter,
} from "@/helpers/apiHelper";

const GET = async (req: NextRequest) => {
  const id = paramGetter(req);
  let [error, message, data, status] = CreateResponseFormat();
  try {
    data = await prisma.project.findUniqueOrThrow({
      where: { id },
    });
  } catch (err) {
    error = (err as Error).message;
    message = "Could not fetch the project";
    status = 404;
  } finally {
    return ResponseHandler(error, message, data, status);
  }
};

const PUT = async (req: NextRequest) => {
  const id = paramGetter(req);
  let [error, message, data, status] = CreateResponseFormat();
  try {
    const body = await req.json();
    data = await prisma.project.update({
      where: { id },
      data: body,
    });
  } catch (err) {
    error = (err as Error).message;
    message = "Could not update the project";
    status = 500;
  } finally {
    return ResponseHandler(error, message, data, status);
  }
};

const DELETE = async (req: NextRequest) => {
  const id = paramGetter(req);
  let [error, message, data, status] = CreateResponseFormat();
  try {
    data = await prisma.project.delete({ where: { id } });
  } catch (err) {
    error = (err as Error).message;
    message = "Could not delet the project";
    status = 500;
  } finally {
    return ResponseHandler(error, message, data, status);
  }
};

export { GET, PUT, DELETE };
