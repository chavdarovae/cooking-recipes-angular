import { NgFor, UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MENU_ITEMS } from '../../constants/menu-items';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
	standalone: true,
	imports: [
		RouterModule,
		NgFor,
		UpperCasePipe
	]
})
export class HeaderComponent {
	menuItems = Object.values(MENU_ITEMS).sort((a,b) => b.id - a.id);
}
