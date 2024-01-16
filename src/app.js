import express from 'express'

import {notFound} from "./utils/errorHandlers.js"
const app= new express();
app.get("/", (req, res) => {
    res.send("Hello World");
}
)   




//import  routesr fr routes


import healthcheckRouter from "./routes/healthcheck.routes.js"

app.use('/api/v1/healthcheck', healthcheckRouter)
// If that above routes didnt work, we 404 them and forward to error handler
app.use(notFound);

app.get ("/", (req, res) => {
    res.json({message: "Api is properly working"});
}
)
export default app;