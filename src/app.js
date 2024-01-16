import express from 'express'
import bodyParser from 'body-parser';
import errorMiddleware from './middleware/error.js';
const app= new express();
  




app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((err, req, res, next) => {
    if (err instanceof ApiError) {
      // It's an instance of ApiError, send a custom response
      res.status(err.statusCode).json({
        statusCode: err.statusCode,
        message: err.message,
        data: err.data,
        success: err.success,
        errors: err.errors
      });
    } else {
      // For non-ApiError instances, you can send a generic error response
      res.status(500).json({
        statusCode: 500,
        message: 'Internal Server Error',
        data:
  null,
  success: false,
  errors: ['An unexpected error occurred']
  });
  }
  });



//import  routes 
import healthcheckRouter from "./routes/healthcheck.routes.js"
import supportAgentRouter from "./routes/supportAgent.routes.js"
import  supportTicket  from './routes/supportTicket.routes.js'

app.use('/api/healthcheck', healthcheckRouter)
app.use('/api/support-agents', supportAgentRouter)
app.use('/api/support-tickets', supportTicket);
// If that above routes didnt work, we 404 them and forward to error handler


app.get ("/", (req, res) => {
    res.json({message: "Api is properly working"});
}
)
export default app;