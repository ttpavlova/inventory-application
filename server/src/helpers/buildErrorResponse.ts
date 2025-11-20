export const buildErrorResponse = (message: string, error: unknown) => {
  const baseResponse = {
    message,
  };

  if (process.env.NODE_ENV === "development") {
    return {
      ...baseResponse,
      error: error instanceof Error ? error.message : error,
    };
  }

  return baseResponse;
};
