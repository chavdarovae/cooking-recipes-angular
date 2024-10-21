import { NgForOf, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
	selector: 'clt-card',
	standalone: true,
	imports: [NgIf, RouterModule, NgForOf],
	templateUrl: './card.component.html',
	styleUrl: './card.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent {

}
