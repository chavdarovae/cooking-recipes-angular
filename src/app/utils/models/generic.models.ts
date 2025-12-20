import { PAGINATION } from '../constants/gengeral.constants';

export class MetaDataReqModel {
    page: number;
    pageSize: number;

    constructor(
        page?: string | number,
        pageSize?: string | number,
        public sort?: string,
    ) {
        this.page = MetaDataReqModel.toNumber(page, 1);
        this.pageSize = MetaDataReqModel.toNumber(
            pageSize,
            PAGINATION.pageSize,
        );
    }

    private static toNumber(
        value: string | number | undefined,
        fallback: number,
    ): number {
        if (value === undefined || value === null) return fallback;
        const num = typeof value === 'string' ? Number(value) : value;
        return Number.isFinite(num) && num > 0 ? num : fallback;
    }
}
