import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));

app.get("/", async(req, res) => {
    try {
        const result = await axios.get("https://v2.jokeapi.dev/joke/Any");
        console.log(result);
        let ques = "";
        let ans = "";
        if(result.data.type == "twopart")
        {
            ques = result.data.setup;
            ans = result.data.delivery
        }
        else{
            ques = "Smile Please 😂";
            ans = result.data.joke
        }
        res.render("index.ejs", { 
            question: ques,
            answer: ans        
        });
    } catch (error) {
        console.log(error.message);
    }
})

app.listen(port, () => {
    console.log(`Server is running on Port ${port}`);
});