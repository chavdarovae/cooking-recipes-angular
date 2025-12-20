import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AlertService } from '../../util-services/alert.service';

@Component({
    selector: 'rcp-alert',
    standalone: true,
    imports: [],
    templateUrl: './alert.component.html',
    styleUrl: './alert.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertComponent {
    alertService = inject(AlertService);
}
