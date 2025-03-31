import express, { Application, Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app: Application = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
const mongoURI: string | undefined = process.env.MONGODB_URI;
if (!mongoURI) {
    console.error('MongoDB URI is missing from environment variables');
    process.exit(1);
}

mongoose
    .connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    } as mongoose.ConnectOptions)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(err));

app.get('/', (req: Request, res: Response) => {
    res.send('API is running...');
});

const PORT: number = Number(process.env.PORT) || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
