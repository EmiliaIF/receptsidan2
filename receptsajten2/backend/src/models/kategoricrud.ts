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

export const getRecipeByCategory = async (category:string) => {
    const recept = await Recept.find({category: category});

    console.log(recept)
    return recept;
}

export const getReceptBysearch = async (searchterm: string) => { // Söker och kollar om där finns något i databasen på antingen "title" eller "category" som matchar searchTerm
    const recipes = await Recept.find({$or: [
      { title: { $regex: '^' + searchterm, $options: 'i' }},
      { category: { $regex: '^' + searchterm, $options: 'i' }}
    ]})
    
    console.log(recipes)
    return recipes
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