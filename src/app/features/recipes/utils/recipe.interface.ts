export interface IRecipeRes {
    id: string;
    title: string;
    ingredients: string;
    instructions: string;
    description: string;
    image: string;
    recommendList?: { id: string }[];
    owner: string;
}

export type RecipeCreateType = Omit<IRecipeRes, 'id' | 'owner'>;
export type RecipeUpdateType = Omit<IRecipeRes, 'owner'>;
