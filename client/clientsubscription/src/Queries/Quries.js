import gql from "graphql-tag";

const GET_ALLUSERS = gql`
  query {
    users {
      name
    }
  }
`;

const CREATE_SINGLEUSER = gql`
  mutation addUser($name: String!, $age: Int) {
    createUser(name:$name, age:$age) {
      name
      id
      posts {
        title
        author {
          name
        }
      }
    }
  }
`;
const CREATE_USER_SUBSCRIPTION = gql`
  subscription {
    newUser {
      id
      name
    }
  }
`;
export { GET_ALLUSERS, CREATE_SINGLEUSER, CREATE_USER_SUBSCRIPTION };
