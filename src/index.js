import React from 'react';
import { ApolloClient, ApolloProvider } from 'react-apollo';
import { buildSchema, graphql } from 'graphql';
import { print } from 'graphql/language/printer';

export const withApolloProvider = ({ schema, root }) => {
  const client = new ApolloClient({
    networkInterface: {
      query: ({ query, variables, operationName }) => {
        const q = print(query);
        const s = buildSchema(schema);
        return graphql(s, q, root, null, variables, operationName);
      },
    },
  });

  return storyFn => {
    return (
      <ApolloProvider client={client}>
        {storyFn()}
      </ApolloProvider>
    );
  };
};
