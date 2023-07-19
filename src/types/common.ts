export type TUser = {
  username: string;
  attributes: {
    sub: string;
    name: string;
    picture: string;
  }
} | null;

export type TImage = {
  url: string;
  name: string;
};

export type TError = {
  message: string;
} | null;