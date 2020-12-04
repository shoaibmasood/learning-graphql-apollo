import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import {
  GET_ALLUSERS,
  CREATE_USER_SUBSCRIPTION,
  CREATE_SINGLEUSER,
} from "../Queries/Quries";

function TestComponent() {
  const { loading, error, data } = useQuery(GET_ALLUSERS);
  console.log(data)
  const [createUser] = useMutation(CREATE_SINGLEUSER, {
    awaitRefetchQueries: true,
  });

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
      <button
        onClick={() => {
          createUser({
            variables: {
              name: "TESTUSER1",
              age: 100,
            },
          });
        }}
      ></button>
    </div>
  );
}

export default TestComponent;
