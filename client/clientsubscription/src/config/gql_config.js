import { ApolloClient, InMemoryCache, split, HttpLink  } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/client/link/ws";



const httpLink = new HttpLink({
  uri: "http://localhost:4001",
});

const wslink = new WebSocketLink({
  uri: "ws:http://localhost:4002",
  options: {
    reconnect: true,
  },
});

const splitLink = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === "OperationDefinition" && operation === "subscription";
  },
  wslink,
  httpLink
);


const client = new ApolloClient({
  cache: new InMemoryCache(),
  splitLink
});

export default client;
