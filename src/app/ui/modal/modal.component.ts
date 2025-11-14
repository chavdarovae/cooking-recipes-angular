import { NgForOf, NgIf } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    Output,
} from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-modal',
    standalone: true,
    templateUrl: './modal.component.html',
    styleUrl: './modal.component.scss',
    imports: [NgIf, RouterModule],
})
export class ModalComponent {
    @Input() entity!: string;
    @Input() show: boolean = false;
    @Output() close = new EventEmitter<boolean>();

    onClose(confirmation?: boolean) {
        this.close.emit(!!confirmation);
        this.show = false;
    }
}
