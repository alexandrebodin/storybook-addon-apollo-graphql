import React from 'react';
import Message from './components/Message';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withApolloProvider } from '../../src/index';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const typeDefs = `
  type Message {
    id: Int
    content: String
    author: String
  }

  input MessageInput {
      content: String
      author: String
  }

  type Query {
    message: Int
  }

  type Mutation {
      updateMessage(id: ID!, input: MessageInput): Message
  }
`;

const mocks = {
  Query: () => ({
    message: () => 1,
  }),
  Mutation: () => ({
    updateMessage: (ctx, { id, input }) => {
      action('updateMessage')(`message-${id}`);
    },
  }),
};

const mutation = gql`
  mutation($id: ID!) {
    updateMessage(id: $id, input: { author: "bouh", content: "bouh" }) {
      id
    }
  }
`;

const Component = ({ data, mutate, id }) => {
  return <button onClick={mutate}>Click to mutate</button>;
};
const ComponentWithMutation = graphql(mutation, {
  options: ({ id }) => ({
    variables: { id },
  }),
})(Component);

export default () => {
  storiesOf('Mutation', module)
    .addDecorator(withApolloProvider({ typeDefs, mocks }))
    .add('A mutation component', () => <ComponentWithMutation id={1} />);
};
