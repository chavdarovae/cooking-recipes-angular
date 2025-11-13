import { TitleCasePipe } from '@angular/common';
import {
	AfterViewInit,
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	EventEmitter,
	Input,
	Output,
	ViewChild,
} from '@angular/core';
import { ControlContainer, FormsModule, NgForm } from '@angular/forms';
import {
	debounceTime,
	distinctUntilChanged,
	fromEvent,
	map,
	Observable,
	tap,
} from 'rxjs';

@Component({
	selector: 'clt-input-textarea',
	standalone: true,
	imports: [FormsModule, TitleCasePipe],
	viewProviders: [
		{
			provide: ControlContainer,
			useExisting: NgForm,
		},
	],
	templateUrl: './input-textarea.component.html',
	styleUrl: './input-textarea.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputTextareaComponent implements AfterViewInit {
	@Input() isTypeAhead!: boolean;
	@Input() isDisabled!: boolean;
	@Input() label!: string;
	@Input() modelName!: string;
	@Input() inpValue!: string;
	@Input() isRequired!: boolean;
	@Input() minLength!: number;
	@Input() maxLength!: number;
	@Input() pattern!: string;
	@Input() placeholder: string = '';

	@Output() onInpChanged: EventEmitter<string> = new EventEmitter();
	@Output() onInpFocusedOut: EventEmitter<string> = new EventEmitter();
	@Output() onInpFocusedIn: EventEmitter<string> = new EventEmitter();

	@ViewChild('inpTextareaRef') inpTextareaRef!: ElementRef;

	inputStream$!: Observable<string>;

	ngAfterViewInit(): void {
		if (this.inpTextareaRef?.nativeElement) {
			this.inputStream$ = fromEvent<any>(
				this.inpTextareaRef?.nativeElement,
				'keyup'
			).pipe(
				map((event: Event) => (event.target as HTMLInputElement).value),
				debounceTime(this.isTypeAhead ? 300 : 0),
				distinctUntilChanged(),
				tap((value) => this.onInpChanged.emit(value))
			);

			this.inputStream$.subscribe();
		}
	}
}
