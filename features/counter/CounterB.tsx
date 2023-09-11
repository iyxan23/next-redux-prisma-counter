"use client";

import { useAppDispatch, useAppSelector } from "@/app/hooks";
import React, { useEffect } from "react";
import { selectCounterStatusB, selectCounterValueB } from "./container";
import Counter from "./Counter";
import { syncB } from "./counterSlice";

export default function CounterB() {
  const count = useAppSelector(selectCounterValueB);
  const status = useAppSelector(selectCounterStatusB);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(syncB(0));
  }, [dispatch]);

  return (
    <>
      <p>Status B: {status.type}</p>
      {status.type == "failed" ? <p>{status.error.error}</p> : <></>}
      <Counter
        count={count}
        status={
          status.type == "pending" || status.type == "idle"
            ? "pending"
            : "loaded"
        }
        increment={() => dispatch(syncB(1))}
        decrement={() => dispatch(syncB(-1))}
      />
    </>
  );
}
