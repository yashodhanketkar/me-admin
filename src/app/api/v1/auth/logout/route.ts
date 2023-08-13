import { NextRequest, NextResponse } from "next/server";

const POST = async (req: NextRequest): Promise<NextResponse> => {
  try {
    const res = NextResponse.json({ message: "user logged out" });
    const cookies = req.cookies.getAll();
    cookies.map((cookie) => res.cookies.delete(cookie.name));
    return res;
  } catch (err) {
    return NextResponse.json({
      error: (err as Error).message,
      message: "log out service failed",
    });
  }
};

export { POST };
