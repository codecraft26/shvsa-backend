import mongoose from "mongoose";

const connectDatabase = () => {
  mongoose
    .connect(`mongodb+srv://aman:aman@cluster0.suqkggz.mongodb.net/?retryWrites=true&w=majority`, {
   
   
      
    })
    .then((data) => {
      console.log(`Mongodb connected with server: ${data.connection.host}`);
    });
};
export { connectDatabase };