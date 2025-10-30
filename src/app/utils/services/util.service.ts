import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class UtilService {

	transformQueryIntoString(query: Record<string, string>) {
		let strToReturn = '?';

		for (const key in query) {

			if (query.hasOwnProperty(key) && !!query[key]) {
				strToReturn += `${key}=${query[key]}&`;
			}
		}
		return strToReturn;
	}

}
