
// import mongoose from 'mongoose'

const dbConnection=async()=>{

    const DB_URI="mongodb://localhost:27017"
    try {
        await  mongoose.connect(DB_URI,{useUnifiedTopology:true})
        console.log("DATABASE CONNECTED SUCCESFULLY")
    } catch (error) {
        console.log(`Error while connecting the database`,error.message)
    }
}

export default dbConnection;