import { UserRolesEnum } from '../enums/user.enums';

export interface IUserRes {
    id: string;
    username: string;
    email: string;
    role: UserRolesEnum;
}

export interface IAccount extends IUserRes {
    password: string;
}

export type UserCreateType = Omit<IUserRes, 'id'>;
export type UserUpdateType = IUserRes;
