import type {UserType} from "../models/user";

let currentUser:UserType;

export function setCurrentUserState(user:UserType){
  currentUser = user;
}
export const getCurrentUserState =   () =>{

    return currentUser;
}
