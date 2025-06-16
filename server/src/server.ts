import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

import typeDefs from './schemas/typeDefs';
import { resolvers } from './resolvers';

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json()); // required for expressMiddleware

// MongoDB connection
const mongoURI = process.env.MONGODB_URI;
if (!mongoURI) {
  console.error('❌ MongoDB URI missing in environment variables.');
  process.exit(1);
}

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as mongoose.ConnectOptions)
.then(() => console.log('✅ MongoDB connected'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// Apollo Server setup (v4)
const startApolloServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  app.use('/graphql', expressMiddleware(server));

  // Optional health check route
  app.get('/', (_req, res) => {
    res.send('🎵 Musician Portfolio API is running with Apollo Server v4');
  });

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () =>
    console.log(`🚀 Server running at http://localhost:${PORT}/graphql`)
  );
};

startApolloServer();
