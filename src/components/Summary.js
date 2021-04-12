import React from 'react'
import { useSelector } from 'react-redux';

export const Summary = () => {
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
    </>
  )
}