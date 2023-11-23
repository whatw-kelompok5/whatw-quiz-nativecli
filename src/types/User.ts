import {AvatarType} from './Avatar';

type AvatarUser = {
  id: number;
  image: string;
};

export type RegisterType = {
  fullname: string;
  email: string;
  avatar: AvatarUser | null;
};
