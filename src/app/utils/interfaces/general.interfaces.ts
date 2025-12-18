import { UserRolesEnum } from '../enums/user.enums';

export interface IAppMenuItem {
    path: string;
    roles: UserRolesEnum[];
    title?: string;
    underMainMenu?: string;
}

export interface IGenericListRes<T> {
    data: T[];
    metaData: IMetaDataListRes;
}

export interface IMetaDataListRes {
    page: number;
    pageSize: number;
    total: number;
    sort?: string;
}
