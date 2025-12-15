import { NgClass } from '@angular/common';
import { Component, EventEmitter, input, Output } from '@angular/core';
import { InputSelectComponent } from '../input-select/input-select.component';
import { IMetaDataRes, PAGING } from 'src/app/utils';

@Component({
    selector: 'clt-paging',
    standalone: true,
    templateUrl: './paging.component.html',
    styleUrl: './paging.component.scss',
    imports: [NgClass, InputSelectComponent],
})
export class PagingComponent {
    paging = input.required<IMetaDataRes>();
    pagingSizeOptions = PAGING.sizeOptions;
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
