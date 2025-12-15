import { UserRolesEnum } from '../enums/user.enums';

export interface IAppMenuItem {
    path: string;
    roles: UserRolesEnum[];
    title?: string;
    underMainMenu?: string;
}

export interface IGenericResList<T> {
    data: T[];
    metaData: IMetaDataRes;
}

export interface IMetaDataRes {
    page: number;
    entitiesPerPage: number;
    total: number;
    sort?: string;
    filter?: string;
}
