import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { quiz } from '../reducers/quiz';

const SummaryContainer = styled.section`
  display: flex;
  flex-direction: column;
  color: white;
`;

const RestartButton = styled.button`
  color: #26233a;
  font-size: 20px;
  font-weight: bold;
  border-style: none;
  padding: 20px 30px;
  border-radius: 50px;
  cursor: pointer;
`

export const Summary = ({ setSection }) => {
  const dispatch = useDispatch();
  const answers = useSelector((state) => state.quiz.answers)

  const correctAnswers = answers.filter((answer) => answer.isCorrect === true)

  console.log(correctAnswers.length)
  return (
    <SummaryContainer>
      <div>
        <h2>You got {correctAnswers.length} correct answers out of 7</h2>
      </div>
      <RestartButton
        type="button"
        onClick={() => {
          dispatch(quiz.actions.restart())
          setSection('welcome')
        }}>
          Restart
      </RestartButton>
    </SummaryContainer>
  )
}