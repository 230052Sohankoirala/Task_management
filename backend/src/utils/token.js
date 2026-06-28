import jwt from "jsonwebtoken";

export function signToken(userId) {
  const expiresMs = Number(process.env.JWT_EXPIRES_MS || 86400000);

  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: Math.floor(expiresMs / 1000),
  });
}
