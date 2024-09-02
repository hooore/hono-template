declare namespace NodeJS {
  interface ProcessEnv {
    HOSTNAME: string;
    PORT: string;
    CORS_ORIGIN_DOMAIN: string;
    JWT_ACCESS_SECRET: stirng;
    JWT_ISSUER: stirng;
    JWT_AUDIENCE: stirng;
  }
}
