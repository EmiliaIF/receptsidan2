import express, { Request, Response} from 'express';
const router = express.Router();
import Recept from "../models/recept";
const bodyParser = require ('body-parser');
import { useParams } from 'react-router';
import {
    getRecipes,
    getReceptById,
   
  } from '../models/receptcrud'




//GET POST
router.get('/', async (req: Request, res: Response) => {
  const responseRecipes = await getRecipes();
  res.status(200).json(responseRecipes);
  // res.json(responseRecipes);
});


//GET POST BY ID

// router.get(
//   "/:receptId",
//   async (req: express.Request, res: express.Response) => {
//     const params = req.params;
//     let id = params.recipeId;
//     const receptById = await getReceptById(id);
//     res.send(receptById);
//   }
// );

router.get(
    "/recept/:receptId",
    async (req: express.Request, res: express.Response) => {
      const params = req.params;
      let id = params.receptId;
      const receptById = await getReceptById(id);

      // const receptId = await getReceptById(req.params.receptId)
      // const recept = await getReceptById(receptId);
      // res.send(recept);
      res.status(200).json(receptById);
    }
  );
// router.get('/:receptId', (req,res) => {
//     const recept = Recept.findById(req.params.receptId)
//     res.json(recept);
// })

router.get(
  "/search/:searchterm",
  async (req: express.Request, res: express.Response) => {
    const params = req.params;

    const searchById = await getReceptBysearch(params.searchterm);
    res.send(searchById);
  }
)


export default router;




function getReceptBysearch(id: string) {
  throw new Error('Function not implemented.');
}
//SUBMIT POST

// router.post('/', async (req,res) =>{
//     const recept = new Recept({
//         title: req.body.title,
//         description: req.body.description,
//         imageUrl: req.body.imageUrl,
//         timeInMins: req.body.timeInMins,
//         ratings: req.body.ratings,
//         category: req.body.ingredients,
//         instructions: req.body.instructions,
//         comments: req.body.comments

//     });
    
//     const savedRecept = await recept.save();
//     res.json(savedRecept);
  
//     // .exec()
//     // .then(data => {
//     //     res.json(data);
//     // })
//     // .catch(err => {
//     //     res.json({ message: err});
//     // });
// });
