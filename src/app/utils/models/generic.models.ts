import { PAGING } from '../constants/gengeral.constants';

export class MetaReqModel {
    page: number;
    pageSize: number;

    constructor(
        page?: string | number,
        pageSize?: string | number,
        public sort?: string,
    ) {
        this.page = MetaReqModel.toNumber(page, 1);
        this.pageSize = MetaReqModel.toNumber(pageSize, PAGING.pageSize);
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
