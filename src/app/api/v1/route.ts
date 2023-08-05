import { NextResponse } from "next/server";

const GET = async () => {
  return NextResponse.json({
    message: "API is running perfectly",
  });
};

export { GET };
