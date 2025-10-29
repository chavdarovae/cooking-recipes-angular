import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'appEnumToList',
	standalone: true,
})
export class EnumToListPipe implements PipeTransform {
	transform<T>(enumObj: T | null | undefined): string[] {
		if (!enumObj) return [];
		return Object.values(enumObj);
	}
}
