import mongoose from "mongoose";

const mongodbConnect = () => {
    try {
        const connect = mongoose.connect(process.env.MONGO_STRING)
        console.log(`Mongodb connection successfully`.bgBlue.black);
        
    } catch (error) {
        console.log(`${error.message}`.bgRed.black);
        
    }
}

export default mongodbConnect