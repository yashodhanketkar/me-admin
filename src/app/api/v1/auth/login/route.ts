import { CreateResponseFormat, ResponseHandler } from "@/helpers/apiHelper";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { verifyUser } from "../func/authhelper";
import { generateToken } from "../func/jwthelpers";

const POST = async (req: NextRequest) => {
  let [error, message, data, status] = CreateResponseFormat();
  try {
    const { username, password } = await req.json();
    const user = await prisma.user.findFirstOrThrow({ where: { username } });

    const isValid = await verifyUser(password, user.password);
    if (!isValid) throw new Error("Incorrect credentials");

    const tokens = await generateToken({
      user: user.username,
      role: user.role,
    });

    const res = NextResponse.json({ user: user.username, role: user.role });

    if (res.cookies.get("yktoken")) res.cookies.delete("yktoken");
    res.cookies.set({
      name: "yktoken",
      value: tokens[0],
      maxAge: 60 * 60,
    });

    if (res.cookies.get("ykrtoken")) res.cookies.delete("ykrtoken");
    res.cookies.set({
      name: "ykrtoken",
      value: tokens[1],
      maxAge: 60 * 60 * 24 * 7,
    });

    return res;
  } catch (err) {
    error = (err as Error).message;
    message = "Login failed";
    status = 500;
  }
  return ResponseHandler(error, message, data, status);
};

export { POST };
