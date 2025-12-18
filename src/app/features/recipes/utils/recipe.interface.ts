export interface IRecipe {
    id?: string;
    title: string;
    ingredients: string;
    instructions: string;
    description: string;
    image: string;
    recommendList?: { id: string }[];
    owner: string;
}
