import { Directive, effect, ElementRef, input, Renderer2, inject } from '@angular/core';
import { UserRolesEnum } from 'src/app/utils';

@Directive({
	selector: '[appIsAuthorised]',
	standalone: true,
})
export class IsAuthorisedDirective {
	// services
	private elementRef = inject(ElementRef);
	private renderer = inject(Renderer2);
	// directive inputs
	appIsAuthorised = input.required<UserRolesEnum[]>();
	role = input<UserRolesEnum>();

	constructor() {
		effect(() => {
			const currRole = this.role() ?? UserRolesEnum.GUEST;
			if (this.appIsAuthorised().includes(currRole)) {
				this.renderer.setStyle(this.elementRef.nativeElement, 'display', '');
			} else {
				this.renderer.setStyle(this.elementRef.nativeElement, 'display', 'none');
			}
		});
	}
}
