import mongoose from "mongoose";

const connectDatabase = (url) => {
  mongoose
    .connect(
      url,
    
    )
    .then((data) => {
      console.log(`Mongodb connected with server: ${data.connection.host}`);
    });
};
export { connectDatabase };
