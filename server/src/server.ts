import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import typeDefs from './schemas/typeDefs';
import { resolvers } from './resolvers';

dotenv.config();

const app = express(); // ✅ Let TS infer type
app.use(express.json());
app.use(cors());

const mongoURI = process.env.MONGODB_URI;
if (!mongoURI) {
  console.error('❌ MongoDB URI is missing.');
  process.exit(1);
}

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as mongoose.ConnectOptions)
.then(() => console.log('✅ MongoDB connected'))
.catch((err) => console.error('MongoDB error:', err));

const startApolloServer = async () => {
  const apolloServer = new ApolloServer({ typeDefs, resolvers });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app: app as any });



  app.get('/', (_req, res) => {
    res.send('🎵 Musician Portfolio API running...');
  });

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () =>
    console.log(`🚀 Server ready at http://localhost:${PORT}${apolloServer.graphqlPath}`)
  );
};

startApolloServer();
