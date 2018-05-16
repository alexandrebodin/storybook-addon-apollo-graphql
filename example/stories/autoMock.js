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

export default () => {
  storiesOf('Auto mocking', module)
    .addDecorator(withApolloProvider({ typeDefs }))
    .add('Auto mocking', () => <Message />);
};
