import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { quiz } from '../reducers/quiz';

export const Summary = () => {
  const dispatch = useDispatch();
  const answers = useSelector((state) => state.quiz.answers)
  console.log(answers)
  return (
    <>
      {answers.map((answer) => {
        return (
          <div>
            <h1>{answer.answer}</h1>
          </div>
        )
      })}
      <button type="submit" onClick={() => dispatch(quiz.actions.restart())}>Restart</button>
    </>
  )
}