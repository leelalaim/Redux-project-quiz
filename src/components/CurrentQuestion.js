import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { quiz } from '../reducers/quiz';

const QuestionSection = styled.section`
  background-color: blue;
  width: 100vw;
  height: 50%;
  margin: 0px;
`

const QuestionTitle = styled.h1`
  font-size: 40px;
  font-family: 'Century gothic'
  margin: 0px;
`

const LabelTitle = styled.label`
  font-size: 20px;`

const ButtonNext = styled.button`
  color: blue;
  font-size: 40px;
`
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
    <QuestionSection>
      <QuestionTitle>Question: {question.questionText}</QuestionTitle>
      {question.options.map((option, index) => {
        return (
          <>
            <LabelTitle htmlFor={option}>{option}</LabelTitle>
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
      {console.log(question.id)}
      <ButtonNext type="submit" onClick={() => dispatch(quiz.actions.goToNextQuestion())}>
        Next
      </ButtonNext>
    </QuestionSection>
  )
}

