import React from 'react';
import { graphql, gql } from 'react-apollo';

const Message = ({ message }) => {
  const { content, author } = message;
  return <div>{content} - {author}</div>;
};

export default graphql(
  gql`
    {
        message(id: 1) {
            content, author
        }
    }
`,
  {
    props: ({ data: { message = {} }, ...rest }) => ({
      message,
      ...rest,
    }),
  }
)(Message);
