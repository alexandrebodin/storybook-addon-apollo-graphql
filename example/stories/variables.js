/**
 * Example combining graphql Component with Knobs live editor
 */

import React from 'react';
import Message from './components/Message';
import { storiesOf } from '@storybook/react';
import { withApolloProvider } from '../../src/index';
import { withKnobs, number, text } from '@storybook/addon-knobs';
import { gql, graphql } from 'react-apollo';

// define your schema
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
    messages: [Message]
  }

  type Mutation {
      updateMessage(id: ID!, input: MessageInput): Message
  }
`;

// fake DB
const messages = {
  1: {
    id: 1,
    content: 'My StoryBook Content test',
    author: 'My author content',
  },
};

// a fake root with getMessages and update/create Messsage
const root = {
  messages: () => Object.values(messages),
  updateMessage: ({ id, input }) => {
    const intId = parseInt(id, 10);
    messages[intId] = Object.assign({}, messages[intId] || { id: intId }, input);
    return messages[intId];
  },
};

// A component to get the messages

const query = gql`
query {
    messages {
        id,
        content,
        author
    }
}
`;

const List = graphql(query)(({ data: { messages = [] } }) => {
  return (
    <div>
      {messages.map((message, index) => {
        return (
          <ul key={index}>
            <li>ID: {message.id}</li>
            <li>Content: {message.content}</li>
            <li>Author: {message.author}</li>
          </ul>
        );
      })}
    </div>
  );
});

// a component to udpate or create a message

const mutation = gql`
mutation ($id: ID! $author: String $content: String) {
  updateMessage(id: $id input: {author: $author content: $content}) {
    id
  }
}
`;

const Component = ({ mutate, id }) => {
  return <button onClick={mutate}>Click to mutate message n°{id}</button>;
};
const ComponentWithMutation = graphql(mutation, {
  options: ({ id, content, author }) => ({
    variables: { id, content, author },
    refetchQueries: [{ query }],
  }),
})(Component);

/**
 * You can navigate between the two stories to see how you can add and update the same DB 
 * and play arround with your components
 */

export default () => {
  storiesOf('Variables', module)
    .addDecorator(withApolloProvider({ schema, root }))
    .addDecorator(withKnobs)
    .add('List of messages', () => {
      console.log('azad');
      return <List />;
    })
    .add('Mutation of messages', () => {
      const id = number('ID', 1);
      const content = text('Content', 'Hello');
      const author = text('Author', 'I.Asimov');

      return <ComponentWithMutation id={id} content={content} author={author} />;
    });
};
