import { NgIf } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [
	NgIf,
	RouterLink
  ],
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.scss'
})
export class RecipeDetailComponent implements OnInit {
	protected recipeService = inject(RecipeService);
	@Input() id!: string;

	ngOnInit(): void {
		this.recipeService.selectRecipe(this.id);
	}
}
