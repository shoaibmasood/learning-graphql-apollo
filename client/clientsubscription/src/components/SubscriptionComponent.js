import React from "react";
import { useSubscription } from "@apollo/client";
import { CREATE_USER_SUBSCRIPTION } from "../Queries/Quries";

function SubscriptionComponent() {
  const { loading, data } = useSubscription(CREATE_USER_SUBSCRIPTION);

  if (loading) return <h1>Loading from subscription</h1>;

  return (
    <div>
      <p>{data?.newUser.name}</p>
      <p>{data?.newUser.id}</p>
    </div>
  );
}

export default SubscriptionComponent;
