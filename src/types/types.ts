export type UserInfoType = {
  email: string;
};

export type FormState = {
  email: string;
  password: string;
  username: string;
};

export interface CustomError extends Error {
  response?: {
    data?: {
      message: string;
    };
  };
}
