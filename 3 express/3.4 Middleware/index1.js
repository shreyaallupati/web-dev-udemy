import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
import body_parser from "body-parser";

const app = express();
const port = 3000;

app.use(body_parser.urlencoded({extended:true}));

app.get("/", (req, res) => {
  //console.log(__dirname + "/public/index.html")
  res.sendFile(__dirname + "/public/index.html");
});


app.post("/submit", (req,res) =>{
  console.log(req.body);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
