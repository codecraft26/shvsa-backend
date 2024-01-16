import express from 'express'
const app= new express();
app.get("/", (req, res) => {
    res.send("Hello World");
}
)   




//import  routesr fr routes


import healthcheckRouter from "./routes/healthcheck.routes.js"

app.use('/api/v1/healthcheck', healthcheckRouter)



app.get ("/", (req, res) => {
    res.json({message: "Api is properly working"});
}
)
export default app;