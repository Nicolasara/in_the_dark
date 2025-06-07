export const logger = {
  log: (message: string, data?: any) => {
    if (__DEV__) {
      console.log(message, data || "");
    }
  },
  error: (message: string, data?: any) => {
    if (__DEV__) {
      console.error(message, data || "");
    }
  },
  warn: (message: string, data?: any) => {
    if (__DEV__) {
      console.warn(message, data || "");
    }
  },
};
