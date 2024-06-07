import { configureStore } from '@reduxjs/toolkit';
import quizReducer from './quizSlice';

const store = configureStore({
  reducer: {
    quiz: quizReducer,
  },
});

// Define RootState type
export type RootState = ReturnType<typeof store.getState>;

export default store;
