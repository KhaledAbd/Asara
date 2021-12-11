import { User } from './user';

export interface Account {
  id: number;

  money: number;

  lastUserMoney: number;

  createdAt: number;

  userId: number;

  userNavigation: User;

  isIntial: boolean;

}
