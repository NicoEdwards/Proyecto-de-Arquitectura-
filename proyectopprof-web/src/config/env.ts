// Constants
export const ENV = {
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL as string,
} as const;

// Validate environment variables
Object.entries(ENV).forEach(([key, value]) => {
  if (!value) throw new Error(`Environment variable ${key} is required`);
});
