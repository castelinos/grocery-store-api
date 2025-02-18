import mongoose from 'mongoose';
import config from '../../config.js';

export default async function connectDB(){
    try {
        let url = getConnectionString(config.db);
        
        await mongoose.connect( url /* , {
            "authSource": config.db.name,
            "user": config.db.user,
            "pass": config.db.password,
        } */);

        console.log('MongoDB connected!!!');
    } catch (error) {
        console.log('Err connecting DB', error);
        process.exit(0);
    }
}

function getConnectionString(db){
    return `mongodb://${db.host}:${db.port}/${db.name}`
}

