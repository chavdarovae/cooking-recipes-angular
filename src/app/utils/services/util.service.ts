import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MetaReqModel } from '../models/generic.models';

@Injectable({
    providedIn: 'root',
})
export class UtilService {
    transformQueryIntoParams<T extends MetaReqModel>(query: T): HttpParams {
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
}
