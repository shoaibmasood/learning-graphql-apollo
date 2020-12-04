import { ApolloClient, InMemoryCache, split, HttpLink  } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/client/link/ws";



const httpLink = new HttpLink({
  uri: "http://localhost:4001",
});

const wsLink = new WebSocketLink({
  uri: "ws://localhost:4001",
  options: {
    reconnect: true,
  },
});

const splitLink = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === "OperationDefinition" && operation === "subscription";
  },
  wsLink,
  httpLink
);


const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink
});

export default client;
