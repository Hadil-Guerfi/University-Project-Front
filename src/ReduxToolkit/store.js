import { configureStore } from "@reduxjs/toolkit";
import supportCoursSlice from "./supportCoursSlice";

export const store = configureStore({
  reducer: {
    supportCoursState: supportCoursSlice,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
