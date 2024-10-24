import { UserRolesEnum } from "src/app/features/users/user.enums";
import { IAppMenuItem } from "src/app/utils/general.interfaces";

export const MENU_ITEMS: Record<string, IAppMenuItem> = {
	home: {
		path: 'home',
		roles: [ UserRolesEnum.ADMIN, UserRolesEnum.USER, UserRolesEnum.GUEST ]
	},
	recipes: {
		path: 'recipes',
		roles: [ UserRolesEnum.ADMIN, UserRolesEnum.USER ]
	},
	contact: {
		path: 'contact',
		roles: [ UserRolesEnum.ADMIN, UserRolesEnum.USER, UserRolesEnum.GUEST ]
	},
	login: {
		path: 'users/login',
		roles: [ UserRolesEnum.ADMIN, UserRolesEnum.GUEST ]
	},
	logout: {
		path: 'users/logout',
		roles: [ UserRolesEnum.ADMIN, UserRolesEnum.USER ]
	},
};
