import { NgClass } from '@angular/common';
import { Component, EventEmitter, input, Output } from '@angular/core';
import { InputSelectComponent } from '../input-select/input-select.component';
import { IMetaDataListRes, PAGINATION } from 'src/app/utils';

@Component({
    selector: 'rcp-pagination',
    standalone: true,
    templateUrl: './pagination.component.html',
    styleUrl: './pagination.component.scss',
    imports: [NgClass, InputSelectComponent],
})
export class PaginationComponent {
    paging = input.required<IMetaDataListRes>();
    pagingSizeOptions = PAGINATION.pageSizeOptions;
    @Output() onPagingChange: EventEmitter<{ page: number; pageSize: number }> =
        new EventEmitter();

    getMaxCount(): number {
        return Math.min(
            this.paging().page * this.paging().pageSize,
            this.paging().total,
        );
    }

    getMinCount(): number {
        return Math.max((this.paging().page - 1) * this.paging().pageSize, 1);
    }
}
