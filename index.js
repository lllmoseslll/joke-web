import { error } from 'console';
import express from 'express';
import axios from 'axios';


const app = express();
const Port = 3000; 


app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');


app.get("/", (req, res) => {
    res.render("index");
});

app.post("/submit", async (req, res) => {
    let string = req.body.name;
    try { const results = await axios.get(`https://v2.jokeapi.dev/joke/Any?format=json`);
    
    console.log(string, results.data);
    res.render("joke.ejs", {
        joke : results.data.joke, setup : results.data.setup, delivery : results.data.delivery , name : string
    })
    

    }catch(error){
        console.log(error);
        res.sendStatus(500);
        return;
    
    
    }
    
});

app.get('/home', (req, res) => {
    res.redirect('/');
});


app.listen(Port, (req, res) => {
    console.log(`listening on ${Port}`);
});