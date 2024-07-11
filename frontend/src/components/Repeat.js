import { useContext, useState } from "react";
import { Term } from "./Term.js";
import { Question } from "./Question.js";
import {api} from "../utils/Api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import Footer from './Footer.js';


const Repeat = ({questions}) => {
  const currentUser = useContext(CurrentUserContext);
  const questionsCount = questions.length;

  const [questionNum, setQuestionNum] = useState(0);
  const [isShowAnswer, setIsShowAnswer] = useState(false);

  const answerClass = isShowAnswer ? 'repeat__answer' : 'repeat__answer-hidden';
  const code = questions[questionNum].answer;
  const list = [];

  code && code.forEach(element => {
    (element.fieldType == 'js') 
    ? list.push(<pre><code className={answerClass + " language-js"}>{element.fieldText}</code></pre>)
    : list.push(<p className={answerClass}>{element.fieldText}</p>)
  });

  function handleGetAnswer() {
    setIsShowAnswer(true);
  }

  function handleQuestionDone() {
    console.log(questions[questionNum]);
    api.setQuestionDone(questions[questionNum]._id)
    .then((question) => {
      console.log(question);
    })
    .catch(err => console.log(`Ошибка.....: ${err}`))
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
            <button className="btn btn_type_back"></button>
            <button className="btn btn_type_done" onClick={handleQuestionDone}></button>
            <button className="btn btn_type_next"></button>
          </div>
        </section>
      </main>
      <Footer/>
    </>
  );
};

export default Repeat;