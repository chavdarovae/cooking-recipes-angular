import { Injectable, signal } from '@angular/core';
import { MetaDataReqModel } from 'src/app/utils/models/generic.models';

@Injectable({
    providedIn: 'root',
})
export class PaginationService<T extends MetaDataReqModel> {
    metaDataReq = signal(new MetaDataReqModel());

    setState(metaData: T): void {
        this.metaDataReq.set(metaData);
    }

    getLastListViewMetaData(): MetaDataReqModel {
        return this.metaDataReq();
    }
}
