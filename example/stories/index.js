import { storiesOf } from '@storybook/react';
import React from 'react';
import Message from './components/Message';
import { withApolloProvider } from '../../src/index';

// declare an offline schema and root to respond to your queries
const schema = `
  type Query {
    message(id: ID!): Message
  } 

  type Message {
    id: Int
    content: String
    author: String
  }
`;

const root = {
  message: id => ({
    id: 1,
    content: 'My StoryBook Content test',
    author: 'My author content',
  }),
};

storiesOf('Message', module)
  .addDecorator(withApolloProvider({ schema, root }))
  .add('Graphql Query', () => {
    return <Message />;
  });
