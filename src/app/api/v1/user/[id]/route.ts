import {
  CreateResponseFormat,
  ResponseHandler,
  paramGetter,
} from "@/helpers/apiHelper";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextRequest } from "next/server";

const GET = async (req: NextRequest) => {
  const id = paramGetter(req);
  let [error, message, result, status] = CreateResponseFormat();
  try {
    result = await prisma.user.findFirst({
      where: { id },
    });
  } catch (err) {
    error = (err as Error).message;
    message = "Error occurred while fetching user";
    status = 500;
  } finally {
    return ResponseHandler(error, message, result, status);
  }
};

const PUT = async (req: NextRequest) => {
  const id = paramGetter(req);
  let [error, message, result, status] = CreateResponseFormat();
  try {
    const body = await req.json();
    console.log(body);
    result = await prisma.user.update({
      where: { id },
      data: body,
    });
    message = "User updated";
  } catch (err) {
    error = (err as Error).message;
    message = "Error occurred while fetching user";
    status = 500;
  } finally {
    return ResponseHandler(error, message, result, status);
  }
};

const DELETE = async (req: NextRequest) => {
  let [error, message, result, status] = CreateResponseFormat();
  try {
    result = await prisma.user.delete({
      where: { id: paramGetter(req) },
    });
    message = "User deleted";
  } catch (err) {
    error = (err as Error).message;
    message = "Error occurred while fetching user";
    status = 500;
  } finally {
    return ResponseHandler(error, message, result, status);
  }
};

export { GET, PUT, DELETE };
