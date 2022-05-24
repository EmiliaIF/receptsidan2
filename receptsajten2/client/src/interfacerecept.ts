export interface interfacerecept {
    _id?: String;
    title: String;
    description: String;
    imageUrl: String;
    timeInMins: Number;
    ratings: Array<number>;
    category: Array<string>;
    ingredients: [{name:string, amount:number, unit:string}];
    instructions: [{instruction:string, order:number}];
    // ratings: number[];
    // category: string[];
    // ingredients: any;
    // instructions: [string];
    // instructions: any;
}