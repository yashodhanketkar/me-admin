import { compare, genSalt, hash } from "bcrypt";

const hashPassword = async (pasword: string): Promise<string> => {
  const hashed = await hash(pasword, 10);
  return hashed;
};

const verifyUser = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  const isValid = await compare(password, hashedPassword);
  return isValid;
};

export { hashPassword, verifyUser };
