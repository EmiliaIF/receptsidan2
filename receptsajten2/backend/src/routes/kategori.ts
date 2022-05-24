import Recept from "../models/recept"

export const getCategories = async () => {
    const kategori = await Recept.aggregate([
        { $match: { }},
        { $unwind: '$category'},
        { $group: { _id: '$category', count: { $sum: 1}}},
        { $sort: {count: -1}}
    ]);
    return kategori;
}


// export const getCategories = async () => {
//     const categories = await RecipeModel.find().distinct('category');
//     return categories
// };






// export const getRecipesByCategory = async () => {
//     const recipesByCategory = await RecipeModel.find()
// }


export const getRecipeByCategory = async (category: String) => {
    const recipes = await Recept.find({category: category});
    return recipes;
}

export const getRecipesByCategorySearch = async (category: String) => {
    const foundRecipe = await Recept.find({
        category: { '$regex': category, '$options': 'i'}
    })
    return foundRecipe
}