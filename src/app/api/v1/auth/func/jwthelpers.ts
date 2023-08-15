import { Algorithm, JwtPayload, Secret, sign, verify } from "jsonwebtoken";
// import fs from "node:fs";

// const SECRET = fs.readFileSync("secrets/private.pem");
// if (!SECRET) throw new Error("Certificate not found");
// const CERT: Secret = fs.readFileSync("secrets/public.pem");
// if (!CERT) throw new Error("Certificate not found");

if (!process.env.NEXT_PRIVATE_KEY) throw new Error("Secret key not found");
if (!process.env.NEXT_PUBLIC_KEY) throw new Error("Certificate not found");

const SECRET: Secret = process.env.NEXT_PRIVATE_KEY;
const CERT: Secret = process.env.NEXT_PUBLIC_KEY;

const algorithm: Algorithm = "RS256";

const isJwtPayload = (obj: any): obj is JwtPayload => {
  return "iat" in obj && "exp" in obj;
};

const generateToken = async (payload: {
  user: string;
  role: string;
}): Promise<[currentToken: string, refreshToken: string]> => {
  const { user, role } = payload;
  return [
    sign({ user, role }, SECRET, { algorithm, expiresIn: "1h" }),
    sign({ user, role }, SECRET, { algorithm, expiresIn: "7d" }),
  ];
};

const verifyToken = async (token: string): Promise<boolean> => {
  return Boolean(verify(token, CERT));
};

const readToken = async (token: string): Promise<JwtPayload> => {
  const decoded = verify(token, CERT);
  if (isJwtPayload(decoded)) return decoded;
  throw Error("Invalid token");
};

const generateRefreshedToken = async (refreshToken: string) => {
  const decoded = (await verifyToken(refreshToken))
    ? await readToken(refreshToken)
    : false;
  if (decoded) {
    delete decoded.exp;
    delete decoded.iat;
    return sign({ ...decoded }, SECRET, { algorithm, expiresIn: "1h" });
  }
  throw new Error("Token expired");
};

export { generateRefreshedToken, generateToken, readToken, verifyToken };
