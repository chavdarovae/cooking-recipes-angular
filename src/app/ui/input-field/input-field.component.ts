import { TitleCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ControlContainer, FormsModule, NgForm } from '@angular/forms';

@Component({
	selector: 'clt-input-field',
	standalone: true,
	imports: [
		FormsModule,
		TitleCasePipe
	],
	viewProviders: [
		{
			provide: ControlContainer,
			useExisting: NgForm
		},
	],
	templateUrl: './input-field.component.html',
	styleUrl: './input-field.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputFieldComponent {
	@Input() label!: string;
	@Input() modelName!: string;
	@Input() inpValue!: string;
	@Input() isRequired!: boolean;
	@Input() minLength!: number;
	@Input() maxLength!: number;
	@Input() pattern!: string;
	@Input() inpType: 'email' | 'number' | 'text' | 'password' = 'text';

	@Output() onInpChanged: EventEmitter<string> = new EventEmitter();
	@Output() onInpFocusedOut: EventEmitter<string> = new EventEmitter();
	@Output() onInpFocusedIn: EventEmitter<string> = new EventEmitter();

}
