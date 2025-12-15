import { NgClass } from '@angular/common';
import { Component, EventEmitter, input, Output } from '@angular/core';
import { MetaReqModel } from 'src/app/utils/models/generic.models';
import { InputSelectComponent } from '../input-select/input-select.component';
import { PAGING } from 'src/app/utils';

@Component({
    selector: 'clt-paging',
    standalone: true,
    templateUrl: './paging.component.html',
    styleUrl: './paging.component.scss',
    imports: [NgClass, InputSelectComponent],
})
export class PagingComponent {
    paging = input.required<MetaReqModel>();
    pagingSizeOptions = PAGING.sizeOptions;
    @Output() onPageChange: EventEmitter<number> = new EventEmitter();
    @Output() onPageSizeChange: EventEmitter<number> = new EventEmitter();
}
