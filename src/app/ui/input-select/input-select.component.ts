import { TitleCasePipe } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ControlContainer, FormsModule, NgForm } from '@angular/forms';
import { debounceTime, distinctUntilChanged, fromEvent, map, Observable, tap } from 'rxjs';
import { EnumToListPipe } from 'src/app/utils';

@Component({
	selector: 'clt-input-select',
	standalone: true,
	imports: [
		FormsModule,
		TitleCasePipe,
		EnumToListPipe
	],
	viewProviders: [
		{
			provide: ControlContainer,
			useExisting: NgForm
		},
	],
	templateUrl: './input-select.component.html',
	styleUrl: './input-select.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputSelectComponent<T> {
	@Input() selectListValue!: T[keyof T] | undefined;
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
