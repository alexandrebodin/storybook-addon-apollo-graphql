import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { SchemaLink } from 'apollo-link-schema';
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';

export const withApolloProvider = ({ typeDefs, mocks, schemaOptions = {}, mockOptions = {} }) => {
  const schema = makeExecutableSchema({ typeDefs, ...schemaOptions });

  addMockFunctionsToSchema({
    schema,
    mocks,
    ...mockOptions,
  });

  const client = new ApolloClient({
    link: new SchemaLink({ schema }),
    cache: new InMemoryCache(),
  });

  return storyFn => {
    return <ApolloProvider client={client}>{storyFn()}</ApolloProvider>;
  };
};
