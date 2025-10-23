import { CommonModule, JsonPipe, NgFor, UpperCasePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IsAuthorisedDirective } from 'src/app/utils/auth.directive';
import { IAppMenuItem } from 'src/app/utils/general.interfaces';
import { AuthService } from '../../../data-access/auth.service';
import { MENU_ITEMS } from '../../constants/menu-items';
import { ListFilterPipe } from 'src/app/utils';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
	standalone: true,
	imports: [
		CommonModule,
		RouterModule,
		IsAuthorisedDirective,
		UpperCasePipe,
		ListFilterPipe
	]
})
export class HeaderComponent {
	protected authService = inject(AuthService);

	menuItems: IAppMenuItem[] = Object.entries(MENU_ITEMS).map(([key, value]) => ({ title: key, ...value }));

	filterMenuMainMenu(mainMenuName: string, equals: boolean): (item: IAppMenuItem) => boolean {
    	return (item: IAppMenuItem) => equals ? item.underMainMenu === mainMenuName : item.underMainMenu !== mainMenuName;
  	}
}
