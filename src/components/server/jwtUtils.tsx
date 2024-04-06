"use server";

import { SignJWT, decodeJwt, jwtVerify } from "jose";
import { JWSSignatureVerificationFailed } from "jose/errors";

const encoder = new TextEncoder();
const secret = encoder.encode(process.env.JWT_SECRET);

interface TokenProps {
  username: string;
  description: string;
  age: number;
}

const generateToken = async ({ username, description, age }: TokenProps): Promise<string> => {
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

const decodeToken = async (jwt: string) => {
  let jsonStructure: {
    isValid: boolean,
    payload: {
      username: string,
      description: string,
      age: number
    }
  };

  try {
    const verifiedJwt = await jwtVerify(jwt, secret);

    jsonStructure = {
      isValid: true,
      payload: {
        username: String(verifiedJwt.payload.username),
        description: String(verifiedJwt.payload.description),
        age: Number(verifiedJwt.payload.age),
      },
    };
  } catch (e) {
    if (e instanceof JWSSignatureVerificationFailed) {
      const jwtPayload = decodeJwt(jwt);

      jsonStructure = {
        isValid: false,
        payload: {
          username: String(jwtPayload.username) ?? "N/A",
          description: String(jwtPayload.description) ?? "N/A",
          age: Number(jwtPayload.age) ?? "N/A",
        },
      };
    } else {
      jsonStructure = {
        isValid: false,
        payload: {
          username: "N/A",
          description: "N/A",
          age: -1,
        },
      };
    }
  }

  return jsonStructure;
}

export { generateToken, decodeToken };
