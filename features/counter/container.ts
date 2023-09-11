import { RootState } from "@/lib/store";

export const selectCounter = (state: RootState) => state.counter.counter;

export const selectCounterStatusA = (state: RootState) =>
  selectCounter(state).statusA;
export const selectCounterStatusB = (state: RootState) =>
  selectCounter(state).statusB;

export const selectCounterValueA = (state: RootState) =>
  selectCounter(state).valueA;
export const selectCounterValueB = (state: RootState) =>
  selectCounter(state).valueB;
