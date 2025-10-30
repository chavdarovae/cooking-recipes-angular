import { LoaderService } from './../../services/loader-service';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
	selector: 'app-footer',
	standalone: true,
	imports: [
		RouterModule
	],
	templateUrl: './footer.component.html',
	styleUrl: './footer.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {
	loaderService = inject(LoaderService);
}
