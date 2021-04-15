import 'reflect-metadata';
import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';
import { PrismaClient } from '../prisma/generated/prismaClient';
import { resolvers } from '../prisma/generated/type-graphql';

const app = async () => {
  const schema = await buildSchema({
    resolvers,
    validate: false,
  });

  const prisma = new PrismaClient();

  const server = new ApolloServer({
    schema,
    playground: true,
    context: () => ({ prisma }),
  });

  server.listen({ port: 3000 }, () => console.log('Server running on port 3000'));
};

app();
