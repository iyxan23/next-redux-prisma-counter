import {
  messageSchema,
  errorMessageSchema,
  CountErrorMessageType,
} from "@/app/api/apiSchema";
import {
  combineReducers,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import undoable, { ActionCreators } from "redux-undo";

// Define a type for the slice state
export interface CounterState {
  valueA: number;
  valueB: number;

  statusA: StatusType;
  statusB: StatusType;
}

type StatusType =
  | { type: "idle" }
  | { type: "pending" }
  | { type: "failed"; error: CountErrorMessageType }
  | { type: "success" };

// Define the initial state using that type
const initialState: CounterState = {
  valueA: 0,
  valueB: 0,

  statusA: { type: "idle" },
  statusB: { type: "idle" },
};

export const syncA = createAsyncThunk(
  "counter/syncA",
  async (amount: number, { dispatch, rejectWithValue, fulfillWithValue }) => {
    dispatch(incrementAByAmount(amount));

    const result = await fetch(`${window.location.origin}/api/a`, {
      method: "POST",
      body: JSON.stringify({ amount }),
      next: { revalidate: 0 },
    });

    if (!result.ok) {
      console.log("result is not ok");
      const error = await result
        .json()
        .then((json) => errorMessageSchema.parseAsync(json));
      dispatch(ActionCreators.undo());
      return rejectWithValue(error);
    }

    const msg = await result
      .json()
      .then((json) => messageSchema.parseAsync(json));

    return fulfillWithValue(msg);
  }
);

export const syncB = createAsyncThunk(
  "counter/syncB",
  async (amount: number, { dispatch, rejectWithValue, fulfillWithValue }) => {
    dispatch(incrementBByAmount(amount));

    const result = await fetch(`${window.location.origin}/api/b`, {
      method: "POST",
      body: JSON.stringify({ amount }),
      next: { revalidate: 0 },
    });

    if (!result.ok) {
      console.log("result is not ok");
      const error = await result
        .json()
        .then((json) => errorMessageSchema.parseAsync(json));
      dispatch(ActionCreators.undo());
      return rejectWithValue(error);
    }

    const msg = await result
      .json()
      .then((json) => messageSchema.parseAsync(json));

    return fulfillWithValue(msg);
  }
);

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    incrementA: (state) => {
      state.valueA += 1;
    },
    decrementA: (state) => {
      state.valueA -= 1;
    },
    incrementAByAmount: (state, action: PayloadAction<number>) => {
      state.valueA += action.payload;
    },
    setA: (state, action: PayloadAction<number>) => {
      state.valueA = action.payload;
    },

    incrementB: (state) => {
      state.valueB += 1;
    },
    decrementB: (state) => {
      state.valueB -= 1;
    },
    incrementBByAmount: (state, action: PayloadAction<number>) => {
      state.valueB += action.payload;
    },
    setB: (state, action: PayloadAction<number>) => {
      state.valueB = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(syncA.pending, (state, _action) => {
        state.statusA = { type: "pending" };
      })
      .addCase(syncA.fulfilled, (state, action) => {
        state.statusA = { type: "success" };

        state.valueA = action.payload.amount;
      })
      .addCase(syncA.rejected, (state, action) => {
        const error = action.payload as CountErrorMessageType;
        state.statusA = { type: "failed", error };
      })

      .addCase(syncB.pending, (state, _action) => {
        state.statusB = { type: "pending" };
      })
      .addCase(syncB.fulfilled, (state, action) => {
        console.log("sync b fulfilled");
        console.log(action);
        state.statusB = { type: "success" };
        state.valueB = action.payload.amount;
      })
      .addCase(syncB.rejected, (state, action) => {
        // the error type for rejectWithValue doesn't propagate properly
        // this is only a workaround
        const error = action.payload as CountErrorMessageType;
        state.statusB = {
          type: "failed",
          error,
        };
      });
  },
});

// Action creators are generated for each case reducer function
export const {
  incrementA,
  decrementA,
  incrementAByAmount,

  incrementB,
  decrementB,
  incrementBByAmount,
} = counterSlice.actions;

const reducer = combineReducers({
  undoable: undoable,
  counter: counterSlice.reducer,
});

export default reducer;
