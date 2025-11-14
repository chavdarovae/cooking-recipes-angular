import { Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Subject } from 'rxjs';

type AlertType = 'danger' | 'warning' | 'info' | 'success';
interface IAlert {
    alert: string;
    type: AlertType;
}

@Injectable({
    providedIn: 'root',
})
export class AlertService {
    private alertSubject = new Subject<IAlert | null>();
    alertSig = toSignal(this.alertSubject.asObservable(), {
        initialValue: null,
    });

    showAlert(alertItem: IAlert) {
        this.clearAlerts();
        this.alertSubject.next(alertItem);

        switch (alertItem.type) {
            case 'success':
                setTimeout(() => this.clearAlerts(), 4000);
                break;
            case 'info':
            case 'warning':
                setTimeout(() => this.clearAlerts(), 5000);
                break;
            case 'danger':
                setTimeout(() => this.clearAlerts(), 6000);
                break;
        }
    }

    clearAlerts() {
        this.alertSubject.next(null);
    }
}
