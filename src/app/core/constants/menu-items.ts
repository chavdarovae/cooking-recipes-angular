import { IAppMenuItem } from "src/app/utils/general.interfaces";

export const MENU_ITEMS: Record<string, IAppMenuItem> = {
	home: {
		id: 0,
		path: 'home',
	},
	contact: {
		id: 2,
		path: 'contact',
	},
	login: {
		id: 3,
		path: 'login',
	},
};
