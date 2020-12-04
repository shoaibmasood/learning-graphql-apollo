import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import {
  GET_ALLUSERS,
  CREATE_USER_SUBSCRIPTION,
  CREATE_SINGLEUSER,
} from "../Queries/Quries";

function TestComponent() {
  const { loading, error, data } = useQuery(GET_ALLUSERS);

  const [createUser] = useMutation(CREATE_SINGLEUSER);

  const handleClick = async () => {
    await createUser({
      variables: {
        name: "TESTUSER1",
        age: 100,
      },
      refetchQueries: [{ query: GET_ALLUSERS }],
    });
  };

  if (loading) return <h1>Loading</h1>;
  if (error) return { error };

  const { users } = data;

  return (
    <div>
      {users.map((user) => (
        <div>
          <ul>
            <li>{user.name}</li>
          </ul>
        </div>
      ))}
      <button onClick={handleClick}>Add User</button>
    </div>
  );
}

export default TestComponent;
