import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { SchemaLink } from 'apollo-link-schema';
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';

export const withApolloProvider = ({ typeDefs, mocks }) => {
  const schema = makeExecutableSchema({ typeDefs });

  addMockFunctionsToSchema({
    schema,
    mocks,
  });

  const client = new ApolloClient({
    link: new SchemaLink({ schema }),
    cache: new InMemoryCache(),
  });

  return storyFn => {
    return <ApolloProvider client={client}>{storyFn()}</ApolloProvider>;
  };
};
