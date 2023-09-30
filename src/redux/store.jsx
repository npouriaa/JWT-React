import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth-slice";
import { usersReducer } from "./users-slice";

export * from "./auth.slice";
export * from "./users.slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable the check temporarily
    }),
});

export default store;
