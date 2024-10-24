import { AsyncPipe, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
	selector: 'app-recipe-list',
	standalone: true,
	templateUrl: './recipe-list.component.html',
	styleUrl: './recipe-list.component.scss',
	imports: [
		AsyncPipe,
		RouterLink,
		NgIf,
	]
})
export class RecipeListComponent {
	protected recipeService = inject(RecipeService);
}
