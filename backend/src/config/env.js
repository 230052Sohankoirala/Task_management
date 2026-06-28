import { ApiError } from "../utils/apiError.js";

const required = ["MONGO_URI", "JWT_SECRET", "CLIENT_URL"];

export function validateEnv() {
  const missing = required.filter((key) => !process.env[key]);

  if (missing.length) {
    throw new ApiError(500, `Missing required environment variables: ${missing.join(", ")}`);
  }

  if (process.env.NODE_ENV === "production" && process.env.JWT_SECRET.length < 32) {
    throw new ApiError(500, "JWT_SECRET must be at least 32 characters in production");
  }

  if (process.env.JWT_SECRET === "ReplaceWithAStrongSecretPhrase") {
    console.warn("Warning: replace the default JWT_SECRET before deploying.");
  }
}

export function corsOptions() {
  const allowedOrigins = (process.env.CLIENT_URL || "http://localhost:5173")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

  return {
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Origin not allowed by CORS"));
    },
    credentials: true,
  };
}
