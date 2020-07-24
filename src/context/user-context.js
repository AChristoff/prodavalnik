import {createContext} from "react";

const defaultUserState = {
  username: window.localStorage.getItem('username') || '',
  role: window.localStorage.getItem('role') || '',
  isAuth: !!window.localStorage.getItem('token'),
  updateUserData() {}
};

const {Consumer: UserConsumer, Provider: UserProvider} = createContext(defaultUserState);

export {
  UserConsumer,
  UserProvider,
  defaultUserState,
}
