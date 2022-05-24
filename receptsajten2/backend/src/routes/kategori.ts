import express, { Request, Response } from 'express';
import { getCategory, getRecipesByCategorySearch, getRecipeByCategory } from '../models/kategoricrud';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    const selectedCategories = await getCategory();
    res.status(200).json(selectedCategories);
    // res.json(selectedRecipes);
});

router.get('/:kategori', async (req: Request, res: Response) => {
    const selectedCategory = await getRecipeByCategory(req.params.category);
    console.log(req.params.category,);
    res.status(200).json(selectedCategory);
})

router.get('/:kategori/recept', async (req: Request, res: Response) => {
    const category = await getRecipesByCategorySearch(req.params.categoryName)
    res.status(200).json(category)
})


// router.get('/categories/:category', async (req: Request, res: Response) => {
//     const responseCategoryRecipes = await getRecipesByCategory();
//     res.status(200).json(responseCategoryRecipes);
// })

export default router;
















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