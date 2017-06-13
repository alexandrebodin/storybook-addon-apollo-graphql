<p align="center">
    <h3 align="center">Storybook Apollo Graphql addon</h3>
    <p align="center">Test your Apollo graphql components with offline graphql server<p>
    <p align="center">
        <a href="https://www.npmjs.com/package/storybook-addon-apollo-graphql"><img src="https://img.shields.io/npm/dt/storybook-addon-apollo-graphql.svg" alt="Npm download"></a>
        <a href="https://www.npmjs.com/package/storybook-addon-apollo-graphql"><img src="https://img.shields.io/npm/v/storybook-addon-apollo-graphql.svg" alt="Npm version"></a>
        <a href="https://www.npmjs.com/package/storybook-addon-apollo-graphql"><img src="https://img.shields.io/circleci/project/github/alexandrebodin/storybook-addon-apollo-graphql.svg" alt="Circle CI status"></a>
    </p>
</p>

## Examples

See [Examples here](example/)

## Usage

Create your stories with the `withApolloProvider` API.

```js
import React from 'react';
import { storiesOf } from '@storybook/react';
import { withApolloProvider } from '../../src';
import { gql, graphql } from 'react-apollo';

const Component = ({ data: { random } }) => <div>{random}</div>;
const ComponentWithGraphql = graphql(gql`{ random }`)(Component);

const schema = `
    type Query {
        random: Int!
    }
`;

const root = {
  random: () => Math.floor(Math.random() * 10),
};

export default () => {
  storiesOf('Random Number', module)
    .addDecorator(withApolloProvider({ schema, root }))
    .add('A random number query', () => <ComponentWithGraphql />);
};
```

> Have a look at [this example](example/stories) stories to learn more about the `withApolloProvider` API.
