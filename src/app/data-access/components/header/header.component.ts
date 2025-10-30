import { CommonModule, UpperCasePipe } from "@angular/common";
import { Component, inject } from "@angular/core";
import { RouterModule } from "@angular/router";
import { IsAuthorisedDirective } from "../../directives/auth.directive";
import { IAppMenuItem, ListFilterPipe, MENU_ITEMS } from "src/app/utils";
import { AuthService } from "../../services/auth.service";


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
