import mongoose from "mongoose";


const connetToDb = async()=>{
    try {
        const connectionInstance = await mongoose.connect(`mongodb+srv://aman:aman@cluster0.suqkggz.mongodb.net/?retryWrites=true&w=majority
        `)
        console.log(`\n MongoDb connected !! DB HOST: ${connectionInstance.connection.host}`)
      
    } catch (error) {
        console.log("MongoDB connection failed",error)
        process.exit(1)
    }
}

export default connetToDb