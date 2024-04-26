import { configureStore } from "@reduxjs/toolkit";
import supportCoursSlice from "./supportCoursSlice";
import ForumSlice from "./ForumSlice";

export const store = configureStore({
  reducer: {
    supportCoursState: supportCoursSlice,
    ForumState: ForumSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
