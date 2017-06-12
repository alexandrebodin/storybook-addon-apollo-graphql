import React from 'react';
import { ApolloClient, ApolloProvider } from 'react-apollo';
import { buildSchema, graphql } from 'graphql';
import { print } from 'graphql/language/printer';

export const withApolloProvider = ({ schema, root }) => storyFn => {
  const client = new ApolloClient({
    networkInterface: {
      query: ({ query, variables, operationName }) => {
        const q = print(query);
        return graphql(buildSchema(schema), q, root);
      },
    },
  });

  return (
    <ApolloProvider client={client}>
      {storyFn()}
    </ApolloProvider>
  );
};
