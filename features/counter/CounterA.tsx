"use client";

import { useAppDispatch, useAppSelector } from "@/app/hooks";
import React, { useEffect } from "react";
import { selectCounterStatusA, selectCounterValueA } from "./container";
import Counter from "./Counter";
import { syncA } from "./counterSlice";

export default function CounterA() {
  const count = useAppSelector(selectCounterValueA);
  const status = useAppSelector(selectCounterStatusA);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(syncA(0));
  }, [dispatch]);

  return (
    <>
      <p>Status A: {status.type}</p>
      {status.type == "failed" ? <p>{status.error.error}</p> : <></>}
      <Counter
        count={count}
        status={
          status.type == "pending" || status.type == "idle"
            ? "pending"
            : "loaded"
        }
        increment={() => dispatch(syncA(1))}
        decrement={() => dispatch(syncA(-1))}
      />
    </>
  );
}
