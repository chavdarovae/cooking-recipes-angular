import { IRecipe } from "./recipe.interface";

export class RecipeCreateItem implements IRecipe {
	title: string;
	ingredients: string;
	instructions: string;
	description: string;
	image: string;
	recommendList: string[];
	owner: string;

	constructor(
		title: string = '',
		ingredients: string = '',
		instructions: string = '',
		description: string = '',
		image: string = '',
		recommendList: string[] = [],
		owner: string = '',
	) {
		this.title = title;
		this.ingredients = ingredients;
		this.instructions = instructions;
		this.description = description;
		this.image = image;
		this.recommendList = recommendList;
		this.owner = owner;
	}
}
