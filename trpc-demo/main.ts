import express from "express";

const app = express();

app.route("/").get((req, res) => {
  res.send("Hello World");
});

console.log("Server is running on port 8000 hahah aaa");
// Listen at port 8000
app.listen(8000, () => console.log("Server is running on port 8000"));
