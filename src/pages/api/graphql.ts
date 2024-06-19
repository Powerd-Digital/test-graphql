import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { gql } from "graphql-tag";
import { NextApiRequest, NextApiResponse } from "next";

const resolvers = {
  Query: {
    hello: () => "world",
  },
};

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const server = new ApolloServer({
  resolvers,
  typeDefs,
});

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  return startServerAndCreateNextHandler(server)(req, res);
}
