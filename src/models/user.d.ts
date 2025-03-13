export type UserType = {
  id: number;
  username: string;
  userAccount: string;
  avatarUrl?: string;
  profile: string;
  gender: number;
  phone: string;
  email: string;
  userStatus: number;
  createTime: Date;
  updateTime: Date;
  userRole: number;
  planetCode: string;
  tags: string[];
};