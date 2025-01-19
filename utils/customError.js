class CustomError extends Error {

    constructor(message, statusCode) {
      if (!message) {
        throw new Error("Message parameter is required.");
      }
      if (!statusCode) {
        throw new Error("StatusCode parameter is required.");
      }
      super(message);
      this.statusCode = statusCode;
    }
  }
  
  export { CustomError };

  