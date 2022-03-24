import { atom } from "recoil";

export const authUserState = atom({
  key: "authUser",
  default: false,
});
