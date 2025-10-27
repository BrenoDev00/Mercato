import { ALLOWED_ORIGINS, NOT_ALLOWED_BY_CORS } from "./constants.js";

export const corsOptions = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  origin: function (origin: any, callback: any) {
    if (!origin || ALLOWED_ORIGINS.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error(NOT_ALLOWED_BY_CORS));
    }
  },
};
