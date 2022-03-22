import { atom } from "recoil";

export const userState = atom({
  key: "user",
  default: {
    email: "",
  },
});

export const authUserState = atom({
  key: "authUserState",
  default: false,
});
