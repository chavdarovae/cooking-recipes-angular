import { Component, inject, OnInit, Signal } from '@angular/core';
import { InputFieldComponent } from 'src/app/ui';
import { NgForm } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { IRecipe } from '../recipe.interface';
import { RecipeQuery } from '../recipe.models';
import { CardComponent } from '../components/card/card.component';
import { IGenericResList } from 'src/app/utils';

@Component({
    selector: 'app-recipe-list',
    standalone: true,
    templateUrl: './recipe-list.component.html',
    styleUrl: './recipe-list.component.scss',
    imports: [CardComponent, InputFieldComponent],
    providers: [NgForm],
})
export class RecipeListComponent implements OnInit {
    // services
    private recipeService = inject(RecipeService);

    // main entity
    recipesResSig: Signal<IGenericResList<IRecipe>> =
        this.recipeService.recipesSig;

    // auxiliary variables
    query!: RecipeQuery;

    ngOnInit(): void {
        this.query = new RecipeQuery('');
        this.recipeService.reloadRecipes(this.query);
    }

    onSearchStringChange(searchStr: string) {
        this.query.search = searchStr;
        this.recipeService.reloadRecipes(this.query);
    }
}
