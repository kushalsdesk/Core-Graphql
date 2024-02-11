import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { log } from "console";

interface Book {
  title: String;
  author: String;
}

const typeDefs = `#graphql

  type Book{
    title: String
    author: String
  }

  type Query{
    books: [Book]
  }

`;

const books: Book[] = [
  {
    title: "The Awakening",
    author: "Kate Chopin",
  },
  {
    title: "City of Glass",
    author: "Paul Auster",
  },
];

const resolvers = {
  Query: {
    books: (): Book[] => books,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

log(`Server  ready at: ${url}`);
