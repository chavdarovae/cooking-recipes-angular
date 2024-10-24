import { UserRolesEnum } from "./user.enums";

export interface IAccount {
	_id?: string,
	username?: string,
	email: string,
	password: string,
	role: UserRolesEnum,
}
