import React from 'react';
import Message from './components/Message';
import { storiesOf } from '@storybook/react';
import { withApolloProvider } from '../../src/index';
import { gql, graphql } from 'react-apollo';

const schema = `
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

const root = {
  message: () => 1,
  updateMessage: ({ id, input }) => ({
    id: 1,
    content: 'My StoryBook Content test',
    author: 'My author content',
  }),
};

const mutation = gql`
mutation ($id: ID!) {
  updateMessage(id: $id input: {author: "bouh" content: "bouh"}) {
    id
  }
}
`;

const Component = ({ mutate, id }) => {
  return <button onClick={mutate}>Click to mutate</button>;
};
const ComponentWithMutation = graphql(mutation, {
  options: ({ id }) => ({
    variables: { id },
  }),
})(Component);

export default () => {
  storiesOf('Mutation', module)
    .addDecorator(withApolloProvider({ schema, root }))
    .add('A mutation component', () => <ComponentWithMutation id={1} />);
};
