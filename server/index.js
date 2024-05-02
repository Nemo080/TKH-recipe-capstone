import express from "express";
import cors from 'cors';

const app = express();


app.use(express.json());
app.use(cors());

//added some routes, but will be its own folder
app.get('/', (req, res)=>{
    res.send('Home route');
});
app.use('/users', (req, res)=>{
    res.send('Testing users route');
});
app.use('/test', (req, res)=>{
    res.send('Route works');
});
app.listen(3000, ()=>{
    console.log(`Server is running on http://localhost:3000`);
});

