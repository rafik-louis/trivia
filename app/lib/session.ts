import "server-only";
import { JWTPayload, SignJWT, jwtVerify } from "jose";
import "../../env.config";
import { cookies } from "next/headers";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload: JWTPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("2d")
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    return error ? null : null;
    // console.log("Failed to verify session", error);
  }
}

export async function createSession(userId: number, isAdmin: boolean) {
  const expiresAt = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000);
  const session = await encrypt({ userId, expiresAt, isAdmin });
  (await cookies()).set("session", session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production" ? true : false,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}
