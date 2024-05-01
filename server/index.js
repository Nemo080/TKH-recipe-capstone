import express from "express";
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());


const router = express.Router();

router.get('/', (req, res)=>{
    res.send('working test route');
})
app.listen(3000, ()=>{
    console.log('Server is running')
});

