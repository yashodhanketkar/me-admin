import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { CreateResponseFormat, ResponseHandler } from "@/helpers/apiHelper";

const GET = async () => {
  let [error, message, result, status] = CreateResponseFormat();
  try {
    result = await prisma.user.findMany();
  } catch (err) {
    error = (err as Error).message;
    message = "Error occurred while fetching users";
    status = 500;
  } finally {
    return ResponseHandler(error, message, result, status);
  }
};

const POST = async (req: NextRequest) => {
  let [error, message, result, status] = CreateResponseFormat();
  try {
    const newUser = await req.json();
    result = await prisma.user.create({
      data: newUser,
    });
    status = 201;
    message = "Successfully created user";
  } catch (err) {
    error = (err as Error).message;
    message = "Failed to create user";
    status = 500;
  } finally {
    return ResponseHandler(error, message, result, status);
  }
};

export { GET, POST };
