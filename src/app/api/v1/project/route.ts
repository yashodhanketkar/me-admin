import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { CreateResponseFormat, ResponseHandler } from "@/helpers/apiHelper";

const GET = async () => {
  let [error, message, data, status] = CreateResponseFormat();
  try {
    data = await prisma.project.findMany();
  } catch (err) {
    error = (err as Error).message;
    message = "Error occurred while fetching projects";
    status = 500;
  } finally {
    return ResponseHandler(error, message, data, status);
  }
};

const POST = async (req: NextRequest) => {
  let [error, message, data, status] = CreateResponseFormat();
  try {
    const newProject = await req.json();
    console.log(newProject);
    data = await prisma.project.create({
      data: newProject,
    });
    message = "Created new user";
    status = 201;
  } catch (err) {
    error = (err as Error).message;
    message = "Unable to create user";
    status = 500;
  } finally {
    return ResponseHandler(error, message, data, status);
  }
};

export { GET, POST };
