import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IRecipe } from '../../utils/recipe.interface';

@Component({
    selector: 'clt-recipe-card',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './recipe-card.component.html',
    styleUrl: './recipe-card.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeCardComponent {
    recipe = input<IRecipe>();
}
