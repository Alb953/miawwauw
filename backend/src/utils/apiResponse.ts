export type ApiResponsePayload<T> = {
  success: true;
  data: T;
  message: string;
};

export const apiResponse = <T>(data: T, message = "Operacion completada correctamente"): ApiResponsePayload<T> => {
  return {
    success: true,
    data,
    message,
  };
};
