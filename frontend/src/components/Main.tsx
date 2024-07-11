import { useContext } from "react";
import { Term } from "./Term.js";
import { Question } from "./Question.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import Footer from './Footer.js';
import { ReactElement } from "react";
import React from "react";


const Main = (props):ReactElement => {
  const currentUser = useContext(CurrentUserContext);
  const page = 'main';
  
  return (
    <>
      <main className="content">
        <section className="gallery">
          <ul className="questions">
              {props.questions.map(question => {
                  return (<Question key={question._id} question={question} onClick={props.onQuestionClick} onQuestionDelete={props.onQuestionDelete}/>)
              })}
          </ul>
        </section>
      </main>
      <Footer/>
    </>
  );
};

export default Main;