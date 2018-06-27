import React from 'react';
import Message from './components/Message';
import { storiesOf } from '@storybook/react';
import { withApolloProvider } from '../../src/index';

// declare an offline schema and root to respond to your queries
const typeDefs = `
  type Query {
    message(id: ID!): Message
  } 

  type Message {
    id: Int
    content: String
    author: String
  }
`;

const mocks = {
  Query: () => ({
    message: (ctx, { id }) => ({
      id: 1,
      content: 'My StoryBook Content test',
      author: 'My author content',
    }),
  }),
};

export default () => {
  storiesOf('WithOptions', module)
    .addDecorator(
      withApolloProvider({
        typeDefs,
        mocks,
        schemaOptions: {
          resolverValidationOptions: {
            requireResolversForResolveType: false,
          },
        },
        mockOptions: {
          presetResolvers: true,
        },
      })
    )
    .add('A message', () => <Message />);
};
