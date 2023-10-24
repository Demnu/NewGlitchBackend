// env.d.ts
declare namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      CONNECTION_STRING: string;
      ORDERMENTUM_TOKEN:string;
      DIST_SUPPLIER_ID:string;
      FLAM_SUPPLIER_ID:string;
      GLITCH_SUPPLIER_ID:string;
      SWAGGER_HOST:string;
    }
  }
  