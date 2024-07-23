import { useState } from 'react';
import Prism from 'prismjs';
import {api} from '../utils/Api.js';
import Footer from './Footer';
import { QuestionType } from './QuestionPopup';
import React from 'react';

type Props = {
    questions: QuestionType[]
  }

const Repeat = (props: Props):JSX.Element => {
    const questions = props.questions;
    const questionsCount = questions.length;

    const [questionNum, setQuestionNum] = useState(0);
    const [isShowAnswer, setIsShowAnswer] = useState(false);

    if (questionsCount === 0) {
        return (
            <p>Нет вопросов для повторения</p>
        );}

    const answerClass = isShowAnswer ? 'repeat__answer' : 'repeat__answer-hidden';
    const backStatus = questionNum <= 0;
    const nextStatus = questionNum >= questionsCount-1;
    const backClass = `btn btn_type_back ${backStatus && 'btn_inactive'}`;
    const nextClass = `btn btn_type_next ${nextStatus && 'btn_inactive'}`;

    const code = questions[questionNum].answer;
    const list:JSX.Element[] = [];

    code && code.forEach(element => {
        (element.type === 'js')
            ? list.push(<pre><code className={answerClass + ' language-js'}>{element.text}</code></pre>)
            : list.push(<p className={answerClass}>{element.text}</p>);
    });

    setTimeout(() => Prism.highlightAll(), 0);

    function handleGetAnswer() {
        setIsShowAnswer(true);
    }

    function handleQuestionBack() {
        setQuestionNum(questionNum - 1);
        setIsShowAnswer(false);
    }

    function handleQuestionNext() {
        setQuestionNum(questionNum + 1);
        setIsShowAnswer(false);
    }

    function handleQuestionDone() {
        api.setQuestionDone(questions[questionNum]._id)
            .then((question) => {
                console.log(question);
            })
            .catch(err => console.log(`Ошибка.....: ${err}`));
        if (questionNum < questionsCount) {
            handleQuestionNext();
        } else {
            console.log('Вы все повторили!');
            alert('Вы все повторили!');
        }
    }
  
    return (
        <>
            <main className="content">
                <section className="repeat">
                    <h2>Повторение</h2>
        
                    <p>Вопрос {questionNum + 1} из {questionsCount}</p>
                    <h3 onClick={handleGetAnswer}>{questions[questionNum].question}</h3>
                    {list}
                    <div className="repeat__btns">
                        <button className={backClass} onClick={handleQuestionBack} disabled={backStatus}></button>
                        <button className="btn btn_type_done" onClick={handleQuestionDone}></button>
                        <button className={nextClass} onClick={handleQuestionNext} disabled={nextStatus}></button>
                    </div>
                </section>
            </main>
            <Footer/>
        </>
    );
};

export default Repeat;