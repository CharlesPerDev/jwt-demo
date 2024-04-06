"use server";

import { SignJWT } from "jose";

const encoder = new TextEncoder();
const secret = encoder.encode(process.env.JWT_SECRET);

interface TokenProps {
  username: string;
  description: string;
  age: number;
}

const generateToken = async ({ username, description, age }: TokenProps) => {
  const token = await new SignJWT({
    username: username,
    description: description,
    age: age,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setIssuer(process.env.PUBLIC_ORIGIN ?? "UNKNOWN")
    .setSubject(username)
    .setExpirationTime("7D")
    .sign(secret);

  return token;
};

const decodeToken = async () => {

}

export { generateToken, decodeToken };
