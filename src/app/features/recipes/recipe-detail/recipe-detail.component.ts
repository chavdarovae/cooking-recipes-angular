import { AuthService } from './../../../data-access/auth.service';
import { Component, inject, Input, OnInit, Signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { IRecipe } from '../recipe.interface';
import { catchError, distinctUntilChanged, EMPTY, Observable, of, Subject, switchMap, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalComponent } from 'src/app/ui/modal/modal.component';
import { AsyncPipe, JsonPipe, NgIf } from "@angular/common";


type RecipeUserInteractionType = 'deleteDialog' | 'delete' | 'recommend';

@Component({
	selector: 'app-recipe-detail',
	standalone: true,
	templateUrl: './recipe-detail.component.html',
	styleUrl: './recipe-detail.component.scss',
	imports: [
		RouterLink,
		ModalComponent,
		NgIf,
		AsyncPipe,
		JsonPipe
	],
})
export class RecipeDetailComponent implements OnInit {
	// services
	private recipeService = inject(RecipeService);
	private router = inject(Router);
	public authService = inject(AuthService);

	// imlicit input from routing
	@Input() id!: string;

	// user interaction
	userIteractionSubj: Subject<RecipeUserInteractionType> = new Subject();
	userIteraction$!: Observable<IRecipe>;

	// main entity
	selectedRecipeSig: Signal<IRecipe | null> = this.recipeService.selectedRecipeSig;

	// aucxiliary variables
	showModal = false;

	ngOnInit(): void {
		this.recipeService.selectRecipe(this.id);
		this.initUserInteraction();
	}

	onModalClosed(confirmation: boolean) {
		if (confirmation) {
			this.userIteractionSubj.next('delete');
		}
	}

	private initUserInteraction(): void {
		this.userIteraction$ = this.userIteractionSubj.asObservable().pipe(
			distinctUntilChanged(),
			switchMap((action) => {
				switch (action) {
					case 'deleteDialog':
						return of('deleteDialog').pipe(
							tap(() => this.showModal = true),
						);
					case 'delete':
						return of('delete').pipe(
							tap(() => console.log('delete')),
							tap(() => this.router.navigateByUrl('/recipes')),
						);
						return this.recipeService.delete(this.selectedRecipeSig()?._id);
					case 'recommend':
						return this.recipeService.recommend(this.selectedRecipeSig()?._id);
				}
			}),
			catchError((err: HttpErrorResponse) => {
				console.error('Recipe operation failed:', err);
				this.initUserInteraction();
				return EMPTY;
			})
		);
	}
}
