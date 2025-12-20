import {
    IUserRes,
    UserCreateType,
    UserRolesEnum,
    UserUpdateType,
} from 'src/app/utils';
import { MetaDataReqModel } from 'src/app/utils/models/generic.models';

export interface IUserWithPassword extends IUserRes {
    password?: string; // new property
}

export class UserCreateItem implements UserCreateType {
    constructor(
        public username: string = '',
        public email: string = '',
        public password: string = '',
        public role: UserRolesEnum = UserRolesEnum.GUEST,
    ) {}
}

export class UserUpdateItem implements UserUpdateType {
    id: string;
    username: string;
    email: string;
    role: UserRolesEnum;

    constructor(user: Partial<IUserRes>) {
        const { id, username, email, role, ...rest } = user;
        this.id = id ?? '';
        this.username = username ?? '';
        this.email = email ?? '';
        this.role = role ?? UserRolesEnum.GUEST;
    }
}

export class UserQuery extends MetaDataReqModel {
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
