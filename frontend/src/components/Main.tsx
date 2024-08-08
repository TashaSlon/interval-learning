import { Question } from './Question';
import { QuestionType } from './QuestionPopup';
import Footer from './Footer';
import React from 'react';
import {useSelector} from 'react-redux';
import {QuestionListState} from '../services/questionSlice';

type Props = {
  onQuestionClick: (arg0: QuestionType) => void,
}

const Main = (props:Props):JSX.Element => {
    const questions: QuestionType[] = useSelector((state: QuestionListState) => state.questions);
  
    return (
        <>
            <main className="content">
                <section className="gallery">
                    <ul className="questions">
                        {questions.map((question:QuestionType) => {
                            return (<Question question={question} onClick={props.onQuestionClick}/>);
                        })}
                    </ul>
                </section>
            </main>
            <Footer/>
        </>
    );
};

export default Main;
