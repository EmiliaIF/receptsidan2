export interface RecipeTypes {
    _id?: String;
    title: String;
    description: String;
    imageUrl: String;
    timeInMins: Number;
    ratings: Array<number>;
    category: String;
    ingredients: [{name:string, amount:number, unit:string}];
    instructions: Array<string>;
    // ratings: number[];
    // category: string[];
    // ingredients: any;
    // instructions: [string];
    // instructions: any;
}

