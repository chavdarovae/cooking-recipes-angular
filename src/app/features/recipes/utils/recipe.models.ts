import { MetaReqModel } from 'src/app/utils/models/generic.models';
import {
    IRecipeRes,
    RecipeCreateType,
    RecipeUpdateType,
} from './recipe.interface';

export class RecipeCreateItem implements RecipeCreateType {
    constructor(
        public title: string = '',
        public ingredients: string = '',
        public instructions: string = '',
        public description: string = '',
        public image: string = '',
    ) {}
}

export class RecipeUpdateItem implements RecipeUpdateType {
    id: string;
    title: string;
    ingredients: string;
    instructions: string;
    description: string;
    image: string;

    constructor(recipe: IRecipeRes) {
        const {
            id,
            title,
            ingredients,
            instructions,
            description,
            image,
            ...rest
        } = recipe;
        this.id = id ?? '';
        this.title = title ?? '';
        this.ingredients = ingredients ?? '';
        this.instructions = instructions ?? '';
        this.description = description ?? '';
        this.image = image ?? '';
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
