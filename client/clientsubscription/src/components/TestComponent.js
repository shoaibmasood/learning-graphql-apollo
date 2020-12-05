import React from "react";
import { useQuery, useMutation, useSubscription } from "@apollo/client";
import { GET_ALLUSERS, CREATE_SINGLEUSER } from "../Queries/Quries";
import SubscriptionComponent from "./SubscriptionComponent";

function TestComponent() {
  const { loading, error, data, refetch } = useQuery(GET_ALLUSERS);

  //   const {data:{newUsers:{name}}}=useSubscription(CREATE_USER_SUBSCRIPTION);
  //   console.log(name)

  const [createUser] = useMutation(CREATE_SINGLEUSER, {
    onCompleted: () => refetch(),
  });

  const handleClick = async () => {
    await createUser({
      variables: {
        name: "TESTUSER1",
        age: 100,
      },

      //   refetchQueries: [{ query: GET_ALLUSERS }],
    });
  };

  if (loading) return <h1>Loading</h1>;
  if (error) return { error };

  const { users } = data;

  return (
    <div>
      {users.map((user, idx) => (
        <div key={idx}>
          <ul>
            <li>{user.name}</li>
          </ul>
        </div>
      ))}

      <button onClick={handleClick}>Add User</button>
      <SubscriptionComponent />
    </div>
  );
}

export default TestComponent;
