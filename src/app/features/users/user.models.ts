import { IUser, UserRolesEnum } from 'src/app/utils';
import { MetaReqModel } from 'src/app/utils/models/generic.models';

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
    id?: string;
    username: string = '';
    email: string = '';
    role: UserRolesEnum = UserRolesEnum.GUEST;

    constructor(user?: Partial<IUser>) {
        if (user) {
            const { id, username, email, role } = user;

            this.id = id;
            this.username = username ?? '';
            this.email = email ?? '';
            this.role = role ?? UserRolesEnum.GUEST;
        }
    }
}

export class UserQuery extends MetaReqModel {
    role?: UserRolesEnum;
    constructor(
        public search?: string,
        role?: string,
        page?: string | number,
        pageSize?: string | number,
        sort?: string,
    ) {
        super(page, pageSize, sort);
        this.role = role as UserRolesEnum;
    }
}
