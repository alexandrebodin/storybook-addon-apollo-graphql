import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { SchemaLink } from 'apollo-link-schema';
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import { withClientState } from 'apollo-link-state';
import { ApolloLink } from 'apollo-link';

export const withApolloProvider = ({
  typeDefs,
  mocks,
  schemaOptions = {},
  mockOptions = {},
  clientDefaults = {},
  clientResolvers = {},
}) => {
  const schema = makeExecutableSchema({ typeDefs, ...schemaOptions });

  addMockFunctionsToSchema({
    schema,
    mocks,
    ...mockOptions,
  });

  const cache = new InMemoryCache();

  const stateLink = withClientState({
    cache,
    resolvers: clientResolvers,
    defaults: clientDefaults,
  });

  const schemaLink = new SchemaLink({ schema });

  const client = new ApolloClient({
    link: ApolloLink.from([stateLink, schemaLink]),
    cache,
  });

  return storyFn => {
    return <ApolloProvider client={client}>{storyFn()}</ApolloProvider>;
  };
};
