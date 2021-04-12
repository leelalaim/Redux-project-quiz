import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { quiz } from '../reducers/quiz';
import { Summary } from './Summary';

export const CurrentQuestion = () => {
  const question = useSelector((state) => state.quiz.questions[state.quiz.currentQuestionIndex])
  const answer = useSelector((state) => state.quiz.answers.find(
    (a) => a.questionId === question.id
  ));

  const dispatch = useDispatch();

  if (!question) {
    return <h1>Oh no! I could not find the current question!</h1>
  }

  return (
    <div>
      <h1>Question: {question.questionText}</h1>
      {question.options.map((option, index) => {
        return (
          <>
            <label htmlFor={option}>{option}</label>
            <input
              key={index}
              type="radio"
              id={index}
              name="contact"
              disabled={answer !== undefined}
              checked={answer !== undefined && answer.answerIndex === index}
              onChange={() => dispatch(quiz.actions.submitAnswer({
                questionId: question.id, answerIndex: index
              }))} />
          </>
        )
      })}
      <button type="submit" onClick={() => dispatch(quiz.actions.goToNextQuestion())}>
        Next
      </button>
      <Summary />
    </div>
  )
}

