"use server";

import { SignJWT } from "jose";

const encoder = new TextEncoder();
const secret = encoder.encode(process.env.JWT_SECRET);

interface getTokenProps {
  username: string;
  description: string;
  age: number;
}

const getToken = async ({ username, description, age }: getTokenProps) => {
  const token = await new SignJWT({
    username: username,
    description: description,
    age: age,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7D")
    .sign(secret);

  return token;
};

export default getToken;
