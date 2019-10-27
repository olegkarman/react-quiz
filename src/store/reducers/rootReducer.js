import { combineReducers } from 'redux';
import quizReducer from "./quiz";
import createQuizReducer from "./createQuiz";
import authReducer from "./auth";

export default combineReducers({
    quiz: quizReducer,
    createQuiz: createQuizReducer,
    auth: authReducer
});