import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { quiz } from '../reducers/quiz';

const SummaryContainer = styled.section`
  display: flex;
  flex-direction: column;
`;

const RestartButton = styled.button`
  color: #26233A;
  font-size: 20px;
  border-style: none;
  padding: 13px;
  border-radius: 10px;
`

export const Summary = () => {
  // const question = useSelector((state) => state.quiz.questions[state.quiz.currentQuestionIndex])
  const dispatch = useDispatch();
  const answers = useSelector((state) => state.quiz.answers)
  return (
    <SummaryContainer>
      <h3>You answered:</h3>
      {answers.map((answer) => {
        return (
          <div>
            <h1>{answer.answer}</h1>
          </div>
        )
      })}
      <RestartButton type="button" onClick={() => { dispatch(quiz.actions.restart()) }}>Restart</RestartButton>
    </SummaryContainer>
  )
}
