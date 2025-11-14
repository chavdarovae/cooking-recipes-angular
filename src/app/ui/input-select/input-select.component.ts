import { TitleCasePipe } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    Output,
} from '@angular/core';
import { ControlContainer, FormsModule, NgForm } from '@angular/forms';
import { EnumToListPipe } from 'src/app/utils';

@Component({
    selector: 'clt-input-select',
    standalone: true,
    imports: [FormsModule, TitleCasePipe, EnumToListPipe],
    viewProviders: [
        {
            provide: ControlContainer,
            useExisting: NgForm,
        },
    ],
    templateUrl: './input-select.component.html',
    styleUrl: './input-select.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputSelectComponent<T> {
    @Input() inpValue!: T[keyof T] | undefined;
    @Input() selectList: T = {} as T;
    @Input() selectEcceptions: string[] = [];
    @Input() isDisabled!: boolean;
    @Input() isRequired!: boolean;
    @Input() label!: string;
    @Input() modelName!: string;
    @Input() placeholder: string = '';

    @Output() onSelectChanged: EventEmitter<T[keyof T]> = new EventEmitter();
    @Output() onSelectFocusedOut: EventEmitter<T[keyof T]> = new EventEmitter();
    @Output() onSelectFocusedIn: EventEmitter<T[keyof T]> = new EventEmitter();
}
