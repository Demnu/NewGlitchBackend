// env.d.ts
declare namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      CONNECTION_STRING: string;
      ORDERMENTUM_TOKEN:string;
      DIST_SUPPLIER_ID:string;
      FLAM_SUPPLIER_ID:string;
      GLITCH_SUPPLIER_ID:string;
      PEA_SUPPLIER_ID:string;
      LOCAL_ADDRESS:string;
      SERVER_ADDRESS:string;
      ENVIRONMENT:string;
      MONGO_URI: string}
  }
  