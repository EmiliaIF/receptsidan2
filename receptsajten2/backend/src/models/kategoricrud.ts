import Recept from "./recept";

export const getCategory = async () => {
    const category = await Recept.aggregate([
        { $match: {} },
        { $unwind: '$category' },
        { $group: { _id: '$category', count: { $sum: 1 } } },
        { $sort: { count: -1 } }
    ]);
    return category;
  }

export const getRecipeByCategory = async (category: String) => {
    const recept = await Recept.find({category: category});
    return recept;
}

export const getRecipesByCategorySearch = async (category: String) => {
    const foundRecipes = await Recept.find({
        category: {'$regex': category, '$options': 'i'}
    })
    return foundRecipes;
}














// import recept from "./recept";
// export const getCategories = async () => {
//     return await recept.find(
//         {},
//         {
//             _id: 0,
//             categories: 1,

//         }
//     );
// };

// export const getRecipesByCategory = async (categoryname: string) => {
//     let foundRecipes = await recept.find({
//         categories: new RegExp("^" + categoryname + "$", "i"),
//     });
//     return foundRecipes;
// };

// export const getRecipeByCategoryAndSearch = async (
//     searchString: string,
//     categoryName: string
// ) => {
//     let foundRecipes = await recept.find({
//         $and:[
//             {categories: new RegExp("^" + categoryName + "$", "i") },
//             {title: {$regex: searchString, $options: "i"} },
//         ],
//     });
//     return foundRecipes;
// };