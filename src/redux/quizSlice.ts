import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Question } from '../types/quizType';

interface QuizState {
  questions: Question[];
  leaderboard: { name: string, score: number }[];
}

const initialState: QuizState = {
  questions: [],
  leaderboard: [],
};

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    setQuestions(state, action: PayloadAction<Question[]>) {
      state.questions = action.payload;
    },
    addScore(state, action: PayloadAction<{ name: string, score: number }>) {
      state.leaderboard.push(action.payload);
    },
  },
});

export const { setQuestions, addScore } = quizSlice.actions;
export default quizSlice.reducer;
