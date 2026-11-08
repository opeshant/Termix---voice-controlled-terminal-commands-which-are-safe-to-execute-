import dotenv from 'dotenv';
import connectDB from './config/db.js';
import { generateCommandEmbeddings } from './services/commandEmbedding.service.js';

dotenv.config();

const run = async () => {

    try {

        await connectDB();

        await generateCommandEmbeddings();

        process.exit(0);

    } catch (error) {

        console.log(error);

        process.exit(1);
    }
};

run();