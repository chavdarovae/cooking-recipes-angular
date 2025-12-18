import { MetaReqModel } from 'src/app/utils/models/generic.models';
import { IRecipe } from './recipe.interface';

export class RecipeCreateItem implements IRecipe {
    title: string;
    ingredients: string;
    instructions: string;
    description: string;
    image: string;
    owner: string;

    constructor(
        title: string = '',
        ingredients: string = '',
        instructions: string = '',
        description: string = '',
        image: string = '',
        owner: string = '',
    ) {
        this.title = title;
        this.ingredients = ingredients;
        this.instructions = instructions;
        this.description = description;
        this.image = image;
        this.owner = owner;
    }
}

export class RecipeQuery extends MetaReqModel {
    constructor(
        public search?: string,
        public owner?: string,
        page?: string | number,
        pageSize?: string | number,
        sort?: string,
    ) {
        super(page, pageSize, sort);
    }
}
