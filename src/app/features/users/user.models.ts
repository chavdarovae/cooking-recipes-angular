import { IUser, IUserQuery, UserRolesEnum } from "src/app/utils";

export class UserEditItem implements IUser {
	_id?: string;
	username?: string = '';
	email: string = '';
	role: UserRolesEnum = UserRolesEnum.GUEST;

	constructor(user?: IUser) {
		if (user) {
			const { _id, username, email, role } = user;

			this._id = _id;
			this.username = username ?? '';
			this.email = email ?? '';
			this.role = role ?? UserRolesEnum.GUEST;
		}
 	}
}

export class UserQuery implements IUserQuery {
	search?: string;
	role?: UserRolesEnum;

	constructor(
		search?: string,
		role?: UserRolesEnum,
	) {
		this.search = search;
		this.role = role;
	}
}
