import { UserRolesEnum } from "../enums/user.enums";
import { IAppMenuItem } from "../interfaces/general.interfaces";

export const MENU_ITEMS: Record<string, IAppMenuItem> = {
	recipes: {
		path: 'recipes',
		roles: [ UserRolesEnum.ADMIN, UserRolesEnum.USER, UserRolesEnum.GUEST ],
	},
	create: {
		path: 'recipes/create',
		roles: [ UserRolesEnum.ADMIN, UserRolesEnum.USER ]
	},
	users: {
		path: 'users',
		roles: [ UserRolesEnum.ADMIN ]
	},
	account: {
		path: 'recipes/account',
		roles: [ UserRolesEnum.ADMIN, UserRolesEnum.USER ],
		underMainMenu: 'account'
	},
	login: {
		path: 'users/login',
		roles: [ UserRolesEnum.GUEST ],
		underMainMenu: 'account'
	},
	logout: {
		path: 'users/logout',
		roles: [ UserRolesEnum.ADMIN, UserRolesEnum.USER ],
		underMainMenu: 'account'
	},
};
