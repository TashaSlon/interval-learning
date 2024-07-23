import { Question } from './Question';
import { QuestionType } from './QuestionPopup';
import Footer from './Footer';
import React from 'react';

type Props = {
  questions: QuestionType[],
  onQuestionClick: (arg0: QuestionType) => void,
  onQuestionDelete: (arg0: QuestionType) => void
}

const Main = (props:Props):JSX.Element => {
  
    return (
        <>
            <main className="content">
                <section className="gallery">
                    <ul className="questions">
                        {props.questions.map((question:QuestionType) => {
                            return (<Question question={question} onClick={props.onQuestionClick} onQuestionDelete={props.onQuestionDelete}/>);
                        })}
                    </ul>
                </section>
            </main>
            <Footer/>
        </>
    );
};

export default Main;