import express, { Request, Response} from 'express';
const router = express.Router();
import Recept from "../models/recept";
const bodyParser = require ('body-parser');
import { useParams } from 'react-router';
import {
    getRecipes,
    getReceptById,
    addStars,
    getReceptBysearch
  } from '../models/receptcrud'

router.get('/', async (req: Request, res: Response) => {
  const responseRecipes = await getRecipes();
  res.status(200).json(responseRecipes);
});


router.get("/:receptId",async (req: express.Request, res: express.Response) => {
      const params = req.params;
      let id = params.receptId;
      const receptById = await getReceptById(id);

      res.status(200).json(receptById);
    }
  );


router.get("/search/:searchterm", async (req: express.Request, res: express.Response) => { // GET Route som kommer med searchterm, vilket sedan används för att söka
    console.log(req.params.searchterm)
    const searchById = await getReceptBysearch(req.params.searchterm);
    res.send(searchById);
  }
)

router.put('/:id/stars', async (req: Request, res: Response) => { // PUT request för att stoppa in antalet stjärnor i rating arrayen
  await addStars(req.params.id, req.body.rating);
  res.send('ok');
})


export default router;
