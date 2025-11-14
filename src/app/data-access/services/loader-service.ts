import { Injectable, WritableSignal, computed, signal } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class LoaderService {
    private _isLoading: WritableSignal<boolean> = signal(false);
    isLoadingSn = computed(() => this._isLoading());

    showLoader() {
        this._isLoading.set(true);
    }

    hideLoader() {
        this._isLoading.set(false);
    }
}
