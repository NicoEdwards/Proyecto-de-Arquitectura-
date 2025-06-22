import "@std/dotenv/load"; // Load environment variables

// Utils
const getEnv = (key: string) => {
  const value = Deno.env.get(key);
  if (!value) throw new Error(`Environment variable ${key} is required`);

  return value;
};

// Constants
export const SERVER_PORT: number = Number(getEnv("SERVER_PORT"));
export const JWT_SECRET: string = getEnv("JWT_SECRET");
export const MONGODB_URI: string = getEnv("MONGODB_URI");
export const ENVIRONMENT: string = Deno.env.get("ENVIRONMENT") || "production";
export const BROWSERLESS_TOKEN: string = getEnv("BROWSERLESS_TOKEN");
