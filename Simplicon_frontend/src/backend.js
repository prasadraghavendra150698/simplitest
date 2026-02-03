// Use REACT_APP_API_URL in production (e.g. https://api.yoursite.com/api)
// Fallback to localhost for development
export const API =
  process.env.REACT_APP_API_URL || "http://127.0.0.1:1331/api";
