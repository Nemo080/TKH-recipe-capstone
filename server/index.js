import express from "express";
import cors from 'cors';

const app = express();
const router = express.Router();

app.use(express.json());
app.use(cors());

app.use('/test', (req, res)=>{
    res.send('Route works');
});
app.listen(3000, ()=>{
    console.log('Server is running')
});

export default router;