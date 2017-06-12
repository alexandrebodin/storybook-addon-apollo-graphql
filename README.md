# Storybook Apollo Graphql Addon

Storybook Apollo Graphql Addon will allow testing Apollo components with offline graphql server. See [Examples](example/)


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