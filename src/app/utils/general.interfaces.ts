import { UserRolesEnum } from "../features/users/user.enums";

export interface IAppMenuItem {
	path: string,
	roles: UserRolesEnum[]
	title?: string,
}
