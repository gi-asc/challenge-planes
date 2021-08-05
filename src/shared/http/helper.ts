export const badRequest = (error: Error) => {
  return {
    statusCode: 400,
    body: {
      message: error.message,
    },
  };
};

export const ok = (body: any) => {
  return {
    statusCode: 200,
    body: body,
  };
};
