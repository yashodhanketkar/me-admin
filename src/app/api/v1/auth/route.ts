import { JwtPayload } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { generateRefreshedToken, readToken } from "./func/jwthelpers";

const POST = async (req: NextRequest) => {
  try {
    let tokenData: JwtPayload = [];
    let newToken: string | boolean = false;
    const currentToken = req.cookies.get("yktoken")?.value;
    const refreshToken = req.cookies.get("ykrtoken")?.value;

    if (!currentToken && !refreshToken) throw new Error("No tokens found");

    if (!currentToken && refreshToken)
      await generateRefreshedToken(refreshToken).then(async (token) => {
        newToken = token;
        tokenData = await readToken(token);
      });

    if (currentToken && refreshToken) tokenData = await readToken(currentToken);

    if (tokenData.iat) delete tokenData.iat;
    if (tokenData.exp) delete tokenData.exp;

    const res = NextResponse.json({
      error: "",
      message: "User Authenticated",
      result: [tokenData],
    });

    if (newToken) {
      if (currentToken) res.cookies.delete("yktoken");
      res.cookies.set("yktoken", newToken);
    }

    return res;
  } catch (err) {
    return NextResponse.json({
      error: (err as Error).message,
      message: "User authentication failed",
      result: [],
    });
  }
};

export { POST };
