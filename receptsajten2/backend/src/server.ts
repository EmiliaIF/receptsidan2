import { connect, connection } from 'mongoose';
import Recept from './routes/recept';
import express, { Request, Response} from 'express';
import cors from 'cors'
import dotenv from 'dotenv'
import bodyParser, { json } from 'body-parser';
import kategori from './routes/kategori';
const app = express();


const port = 3005



dotenv.config();

//Listening to server
connect('mongodb+srv://root:emilia123@cluster0.xv0ks.mongodb.net/receptsajten?retryWrites=true&w=majority')
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

app.use(cors())

app.use(json());



app.use(bodyParser.json());

//IMPORT ROUTES


//ROUTES
app.get('/', (req, res) => {
    res.send();
});




app.use('/recept', Recept)
app.use('/kategori', kategori)


