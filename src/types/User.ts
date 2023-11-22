import {AvatarType} from './Avatar';

export type RegisterType = {
  fullname: string;
  email: string;
  avatar: AvatarType | null;
};
