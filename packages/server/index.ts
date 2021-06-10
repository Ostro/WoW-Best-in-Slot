import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import express from 'express';
import { bodyParserGraphQL } from 'body-parser-graphql';
import cors from 'cors';
import prismaClient from './services/prismaClient';
import { resolvers as PrismaResolvers } from './prisma/generated/type-graphql';
import basicAuth from './middlewares/basicAuth';
import AuthResolver from './resolvers/auth.resolvers';

const startApp = async () => {
  const schema = await buildSchema({
    resolvers: [...PrismaResolvers, AuthResolver],
    validate: false,
  });

  const server = new ApolloServer({
    schema,
    playground: true,
    context: () => ({ prisma: prismaClient }),
  });

  await server.start();

  const app = express();

  app.use(cors());
  app.use(bodyParserGraphQL());
  app.use(basicAuth);
  server.applyMiddleware({ app });

  await app.listen({ port: 3000 });
  console.log(`🚀 Server ready at http://localhost:3000${server.graphqlPath}`);
};

startApp();
