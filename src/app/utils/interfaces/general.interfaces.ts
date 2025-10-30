import { UserRolesEnum } from "../enums/user.enums";

export interface IAppMenuItem {
	path: string,
	roles: UserRolesEnum[]
	title?: string,
	underMainMenu?: string,
}
