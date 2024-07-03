import { isAxiosError } from "axios";

export const handleAPIerror = (error: unknown) => {
  if (isAxiosError(error)) {
    return {
      message: error.message,
      name: error.name,
      code: error.code,
      status: error.response?.status,
      data: error.response?.data,
    };
  }
  return error;
};
