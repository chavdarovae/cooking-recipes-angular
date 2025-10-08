import { AsyncPipe, NgIf } from '@angular/common';
import { Component, inject, OnInit, Signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IRecipe } from '../recipe.interface';
import { RecipeService } from '../recipe.service';

@Component({
	selector: 'app-recipe-list',
	standalone: true,
	templateUrl: './recipe-list.component.html',
	styleUrl: './recipe-list.component.scss',
	imports: [
		RouterLink,
	]
})
export class RecipeListComponent implements OnInit {
	// services
	private recipeService = inject(RecipeService);

	// main entity
	recipes: Signal<IRecipe[]>= this.recipeService.recipesSig;

	ngOnInit(): void {
		this.recipeService.reloadRecipes();
	}
}
