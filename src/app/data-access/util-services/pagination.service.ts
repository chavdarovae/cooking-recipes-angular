import { HttpParams } from '@angular/common/http';
import {
    Injectable,
    signal,
    computed,
    Signal,
    WritableSignal,
} from '@angular/core';
import { MetaDataReqModel } from 'src/app/utils/models/generic.models';

@Injectable({
    providedIn: 'root',
})
export class PaginationService<T extends MetaDataReqModel> {
    static readonly META_DATA_KEY = 'rcp-meta-data-list';
    private requestMetaData!: WritableSignal<T | null>;

    public readonly prevReqMetaData: Signal<T | null> = computed(() => {
        return this.requestMetaData();
    });

    constructor() {
        let inital = null;
        const stored =
            sessionStorage.getItem(PaginationService.META_DATA_KEY) ?? '';
        if (stored) {
            const parcedMetaData = JSON.parse(stored);
            if (this.isMetaDataReq(parcedMetaData)) {
                inital = parcedMetaData as T;
            }
        }
        this.requestMetaData = signal(inital);
    }

    setState(metaData: T): void {
        this.requestMetaData.set(metaData);
        sessionStorage.setItem(
            PaginationService.META_DATA_KEY,
            JSON.stringify(metaData),
        );
    }

    transformQueryIntoParams<T extends MetaDataReqModel>(query: T): HttpParams {
        let params = new HttpParams();
        for (const key in query) {
            if (!Object.hasOwn(query, key)) continue;

            const value = query[key];

            if (!['string', 'number', 'boolean'].includes(typeof value))
                continue;

            params = params.append(key, String(value));
        }
        return params;
    }

    private isMetaDataReq(obj: any): obj is MetaDataReqModel {
        return (
            obj &&
            typeof obj.page === 'number' &&
            typeof obj.pageSize === 'number'
        );
    }
}
