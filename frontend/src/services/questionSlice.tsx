import {createSlice} from '@reduxjs/toolkit';
import {QuestionType} from '../components/QuestionPopup';
import { api } from '../utils/Api.js';

export interface QuestionListState {
	questions: QuestionType[]
}

const initialState: QuestionListState = {
    questions: []
};

const questionSlice = createSlice({
    name: 'questions',
    initialState,
    reducers: {
        addQuestion(state, action) {
            api.addNewQuestion(action.payload)
                .then((newQuestion:QuestionType) => {
                    state.questions.push(newQuestion);
                    //closeAllPopups();
                })
                .catch(err => console.log(`Ошибка.....: ${err}`));    
        },
        getQuestions(state) {
            api.getQuestions()
                .then(questions => {
                    state.questions = questions;
                })
                .catch(err => console.log(`Ошибка.....: ${err}`));
        },
    },
});

export const {addQuestion, getQuestions} = questionSlice.actions;
export default questionSlice.reducer;
