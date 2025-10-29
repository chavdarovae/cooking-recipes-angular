import { AlertService } from './../../../core/services/alert.service';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { RecipeCreateItem } from '../recipe.models';
import { RecipeService } from '../recipe.service';
import { catchError, distinctUntilChanged, EMPTY, Observable, Subject, switchMap, tap } from 'rxjs';
import { IRecipe } from '../recipe.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { InputFieldComponent } from 'src/app/ui';

type RecipeUserInteractionType = 'create' | 'update';

@Component({
	selector: 'app-recipe-create',
	standalone: true,
	templateUrl: './recipe-create.component.html',
	styleUrl: './recipe-create.component.scss',
	imports: [
		CommonModule,
		FormsModule,
		RouterModule,
		InputFieldComponent
	],
})
export class RecipeCreateComponent implements OnInit {
	// services
	private recipeService = inject(RecipeService);
	private alertService = inject(AlertService);
	private router = inject(Router);

	// user interaction stream
	userIteractionSubj: Subject<RecipeUserInteractionType> = new Subject();
	userIteraction$!: Observable<IRecipe>;
	allowedInteraction!: RecipeUserInteractionType;

	// main entity
	recipe!: IRecipe | RecipeCreateItem;
	currInteraction!: RecipeUserInteractionType;

	ngOnInit(): void {
		this.recipe = history.state?.['recipe'] ?? new RecipeCreateItem();
		this.allowedInteraction = (this.recipe as IRecipe)?._id ? 'update' : 'create';
		this.initUserInteraction();
	}

	private initUserInteraction(): void {
		this.userIteraction$ = this.userIteractionSubj.asObservable().pipe(
			distinctUntilChanged(),
			tap((action) => this.currInteraction = action),
			switchMap((action) => {
				switch (action) {
					case 'create':
						return this.recipeService.create(this.recipe);
					case 'update':
						return this.recipeService.update(this.recipe);
				}
			}),
			tap(() => {
				this.router.navigateByUrl('/recipes');
				this.alertService.showAlert({alert: `The recipe was successfully ${this.currInteraction}d!`, type: 'success'})
			}),
			catchError((err: HttpErrorResponse) => {
				console.error('Recipe operation failed:', err);
				this.initUserInteraction();
				return EMPTY;
			})
		);
	}
}
