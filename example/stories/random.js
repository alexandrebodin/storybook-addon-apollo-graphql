import React from 'react';
import { storiesOf } from '@storybook/react';
import { withApolloProvider } from '../../src';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const Component = ({ data: { random } }) => <div>{random}</div>;
const ComponentWithGraphql = graphql(
  gql`
    {
      random
    }
  `
)(Component);

const typeDefs = `
    type Query {
        random: Int!
    }
`;

const mocks = {
  Query: () => ({
    random: () => Math.floor(Math.random() * 10),
  }),
};

export default () => {
  storiesOf('Random Number', module)
    .addDecorator(withApolloProvider({ typeDefs, mocks }))
    .add('A random number query', () => <ComponentWithGraphql />);
};
