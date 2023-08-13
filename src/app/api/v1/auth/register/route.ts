import { CreateResponseFormat, ResponseHandler } from "@/helpers/apiHelper";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { hashPassword } from "../func/authhelper";

const POST = async (req: NextRequest): Promise<NextResponse> => {
  let [error, message, data, status] = CreateResponseFormat();
  try {
    const { picture, username, firstName, lastName, password, profile, role } =
      await req.json();
    const hashedPassword = await hashPassword(password);

    if (await prisma.user.findFirst({ where: { username } }))
      throw new Error("User already exists");

    data = await prisma.user.create({
      data: {
        picture: picture && picture,
        role,
        username,
        firstName,
        lastName,
        password: hashedPassword,
        profile: profile && profile,
      },
    });

    const res = NextResponse.json({ message: "New user registerd" });
    req.cookies.getAll().map((cookie) => res.cookies.delete(cookie.name));

    return res;
  } catch (err) {
    error = (err as Error).message;
    message = "Registration failed";
    status = 500;
  } finally {
    return ResponseHandler(error, message, data, status);
  }
};

export { POST };
