const { ApolloServer, gql, PubSub } = require("apollo-server");

const users = [
  {
    name: "shoaib",
    id: "0",
    age: 28,
  },
  {
    name: "naveed",
    id: "1",
  },
];

const posts = [
  {
    title: "Post 1",
    body: "Body1",
    id: "0",
    author: "1",
  },
  {
    title: "Post 2",
    body: "Body2",
    id: "1",
    author: "0",
  },
];
const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    age: Int
    posts: [Post!]!
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    author: User!
  }

  type Query {
    message: String!
    users(filterbyName: String): [User!]!
    user(id: ID!): User
    posts(title: String): [Post!]!
  }

  type Mutation {
    createUser(name: String!, age: Int): User
  }

  type Subscription {
    postAdded: Post
    newUser: User!
  }
`;

// const POST_ADDED = "POST_ADDED";
const NEW_USER = "NEW_USER";

const resolvers = {
  Subscription: {
    // postAdded: {
    //   subscribe: () => pubsub.asyncIterator([POST_ADDED]),
    // },
    newUser: {
      subscribe: () => pubsub.asyncIterator(NEW_USER),
    },
  },

  Query: {
    message: () => {
      return "this is a message";
    },
    //GEt ALL USERS or FILTER USER BY NAME NO CASE SENSITIVE
    users: (parent, args) => {
      if (args.filterbyName) {
        return users.filter((user) =>
          user.name.toLowerCase().includes(args.filterbyName)
        );
      }
      return users;
    },

    //GET SINGLE USER
    // this function never  runs if data/id not there
    user: (parent, args) => {
      return users.find((user) => user.id === args.id);
    },

    //GET POST FIlTERED BY TITLE
    posts: (parent, args) => {
      if (args.title) {
        return posts.filter((post) => post.title.includes(args.title));
      }
      return posts;
    },
  },

  Mutation: {
    createUser: (parent, args, { pubsub }) => {
     

      const id = users.length;
      const { name, age } = args;
      // const filteredName = users.filter(user => user.name === name)
      // //   if(!filteredName){
      // //       console.log("user Name already exists")
      // //       return users
      // //     }
      const newUser = {
        name,
        age,
        id,
      };
      users.push(newUser);
      // pubsub.publish(POST_ADDED, {postAdded:args})
      pubsub.publish(NEW_USER,{
        newUser
      });

      return newUser;
    },
  },

  // Adding Resolvers For Custom type i.e Post
  Post: {
    author: (parent, args) => {
      return users.find((user) => user.id === parent.author);
    },
  },

  User: {
    posts: (parent, args) => {
      return posts.filter((post) => post.author === parent.id);
    },

    // Customize age property if you want overwrite by adding
    // this property
    //   age: () => {
    //       return 0
    //   }
  },
};

const pubsub = new PubSub();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: { pubsub },
});

server
  .listen({ port: 4001 })
  .then((res) => {
    console.log(`The server is running on port ${res.url}`);
  })
  .catch((err) => {
    console.log(err);
  });
