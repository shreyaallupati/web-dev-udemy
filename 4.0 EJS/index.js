import express from "express";

const app = express();
const port = 3000;

app.get("/", (req, res)=>{
    const today = new Date();
    const day = today.getDate();

    let type = " a weekday";
    let adv = "its time to work hard" ;

    if (day ===0|| day ===6){
        let type = " weekend";
        let adv = "its time to party" ;
    }

    res.render("index.ejs", {dayType: type, advice: adv});
});


app.listen(port, ()=>{
    console.log("server sunning on port 3000");
});
