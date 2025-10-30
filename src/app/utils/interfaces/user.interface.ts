import { UserRolesEnum } from "../enums/user.enums";

export interface IUser {
	_id?: string,
	username?: string,
	email: string,
	role: UserRolesEnum,
}

export interface IAccount extends IUser {
	password: string;
}

export interface IUserQuery {
	search?: string;
	role?: UserRolesEnum;
}

