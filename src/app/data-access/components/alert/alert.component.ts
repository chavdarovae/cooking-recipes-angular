import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AlertService } from '../../services/alert.service';

@Component({
    selector: 'app-alert',
    standalone: true,
    imports: [],
    templateUrl: './alert.component.html',
    styleUrl: './alert.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertComponent {
    alertService = inject(AlertService);
}
