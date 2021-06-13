import { IUser } from "../interfaces/user";

// return the user data from the local storage
export const getUser = (): IUser | null => {
  const user = localStorage.getItem("user");
  if (user) {
    return JSON.parse(user);
  }
  return null;
};

// return the token from the local storage
export const getToken = (): string | null => {
  return localStorage.getItem("token") || null;
};

// remove the token and user from the local storage
export const removeUserSession = (): void => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

// set the token and user to the local storage
export const setUserSession = (token: string, user: IUser): void => {
  console.log(token);
  console.log(user)
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
};
