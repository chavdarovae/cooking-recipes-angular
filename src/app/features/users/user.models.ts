import { IUser, IUserQuery, UserRolesEnum } from 'src/app/utils';

export interface IUserWithPassword extends IUser {
    password?: string; // new property
}

export class UserCreateItem implements IUserWithPassword {
    constructor(
        public username: string = '',
        public email: string = '',
        public password: string = '',
        public role: UserRolesEnum = UserRolesEnum.GUEST,
    ) {}
}

export class UserEditItem implements IUser {
    _id?: string;
    username: string = '';
    email: string = '';
    role: UserRolesEnum = UserRolesEnum.GUEST;

    constructor(user?: Partial<IUser>) {
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

    constructor(search?: string, role?: UserRolesEnum) {
        this.search = search;
        this.role = role;
    }
}
