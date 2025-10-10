import express from "express";
const app = express();
const port = 3000;

app.get("/",(req,res) => {
    res.send("<h1>hello world!!</h1>");
});

app.get("/1",(req,res) => {
    res.send("<h1>this is test server</h1>");
});

app.listen(port , () => {
    console.log(`server running on port ${port}.`);
});


app.post("/register",(req,res) => {
    res.send(201);
});
app.put("/user/xyz",(req,res) => {
    res.send(200);
});
app.patch("/user/xyz",(req,res) => {
    res.send(200);
});
app.delete("/user/xyz",(req,res) => {
    res.send(200);
});