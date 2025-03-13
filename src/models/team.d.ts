import type {UserType} from "./user";

export type TeamType =  {
  id: number;
  name: string;
  description: string;
  status: number;
  maxNum: number;
  userId: number;
  expireTime: Date;
  createTime: Date;
  updateTime: Date;
  createUser?: string;
  userList?: UserType[];
};