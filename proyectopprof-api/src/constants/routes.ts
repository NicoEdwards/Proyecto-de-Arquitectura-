export const ROUTE_SEGMENTS = {
  API: "/api",
  AUTH: "/auth",
  LOGIN: "/login",
  USERS: "/users",
  FEEDS: "/feeds",
  SCRAPER: "/scraper",
  BCI: "/bci",
  CHILE: "/chile",
} as const;

export const ROUTES = {
  AUTH: `${ROUTE_SEGMENTS.API}${ROUTE_SEGMENTS.AUTH}`,
  USERS: `${ROUTE_SEGMENTS.API}${ROUTE_SEGMENTS.USERS}`,
  FEEDS: `${ROUTE_SEGMENTS.API}${ROUTE_SEGMENTS.FEEDS}`,
  SCRAPER: `${ROUTE_SEGMENTS.API}${ROUTE_SEGMENTS.SCRAPER}`,
} as const;
