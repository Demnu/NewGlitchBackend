// env.d.ts
declare namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      CONNECTION_STRING: string;
    }
  }
  