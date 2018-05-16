import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const Message = ({ data: { message = {} } }) => {
  const { content, author } = message;
  return (
    <div>
      {content} - {author}
    </div>
  );
};

export default graphql(
  gql`
    {
      message(id: 1) {
        content
        author
      }
    }
  `
)(Message);
