import express, { Request, Response } from 'express';
import { getCategory, getReceptBysearch, getRecipeByCategory } from '../models/kategoricrud';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    const selectedCategories = await getCategory();
    res.status(200).json(selectedCategories);
});

router.get('/:kategori', async (req: Request, res: Response) => {
    console.log(req.params.kategori);
    const selectedCategory = await getRecipeByCategory(req.params.kategori);
   
    res.status(200).json(selectedCategory);
})

router.get("/search/:searchterm", async (req: express.Request, res: express.Response) => { // GET Route som kommer med searchterm, vilket sedan används för att söka
    console.log(req.params.searchterm)
    const searchById = await getReceptBysearch(req.params.searchterm);
    res.send(searchById);
  }
) 

export default router;