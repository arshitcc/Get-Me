import mongoose from "mongoose";

interface DBConnection{
    isConnected? : number,
    connectionHost? : string
}

const connection : DBConnection = {}; 

async function connectDB () {
    if(connection.isConnected){
        console.log(`DB Connection is already established`);
    }
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${process.env.DB_NAME}`);
        connection.isConnected = connectionInstance.connections[0].readyState;
        connection.connectionHost = connectionInstance.connections[0].host;
    } catch (error : any) {
        console.log('Error Connecting Database : ', error);
        process.exit(1);
    }
}

export default connectDB;