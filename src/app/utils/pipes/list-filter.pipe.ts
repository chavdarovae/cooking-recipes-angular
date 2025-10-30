import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'appListFilterPipe',
	standalone: true,
})
export class ListFilterPipe implements PipeTransform {
	transform<T>(items: T[] | null | undefined, filterFn ?: (item: T) => boolean): T[] {
		if (!items) return [];
		if (!filterFn) return items;
		return items.filter(filterFn);
	}
}
