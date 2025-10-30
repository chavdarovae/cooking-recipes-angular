export interface IRecipe {
	_id?: string,
	title: string,
	ingredients: string,
	instructions: string,
	description: string,
	image: string,
	recommendList?: { _id: string}[],
	owner: string,
}

export interface IRecipeQuery {
	search?: string,
	owner?: string
}
