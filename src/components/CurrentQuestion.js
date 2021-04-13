import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { quiz } from '../reducers/quiz';

const QuestionSection = styled.section`
  width: 100vw;
  margin: 0 35px;
`

const QuestionTitle = styled.h1`
  font-size: 40px;
  font-family: 'Helvetica'
  margin: 0px;
  color: #26233A;
  text-align: left;
`

const LabelTitle = styled.label`
  font-size: 20px;`

const ButtonNext = styled.button`
  color: #26233A;
  font-size: 20px;
  border-style: none;
  padding: 13px;
  border-radius: 10px;
  align-items: right;
`

const Options = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 400px;
`;

const SubmitButton = styled.button`
  color: #26233A;
  font-size: 20px;
  border-style: none;
  padding: 13px;
  border-radius: 10px;
`

export const CurrentQuestion = ({ setSection }) => {
  const question = useSelector((state) => state.quiz.questions[state.quiz.currentQuestionIndex])
  const answer = useSelector((state) => state.quiz.answers.find(
    (a) => a.questionId === question.id
  ));

  const currentQuestionIndex = useSelector((state) => state.quiz.currentQuestionIndex)

  const correctAnswer = useSelector((state) => state.quiz.answers[currentQuestionIndex])

  console.log(correctAnswer, currentQuestionIndex)

  const determineCorrectness = () => {
    if (correctAnswer === undefined) {
      return <h3>Waiting for an answer...</h3>
    } else if (correctAnswer) {
      if (correctAnswer.isCorrect) {
        return <h3>CORRECT!</h3>
      } else {
        return <h3>WRONG!</h3>
      }
    }
  }

  const dispatch = useDispatch();

  if (!question) {
    return <h1>Oh no! I could not find the current question!</h1>
  }

  return (
    <QuestionSection>
      <QuestionTitle>Question: {question.questionText}</QuestionTitle>
      {question.options.map((option, index) => {
        return (
          <Options>
            <LabelTitle htmlFor={option}>{option}</LabelTitle>
            <input
              key={index}
              type="radio"
              id={index}
              name="contact"
              disabled={answer !== undefined}
              checked={answer !== undefined && answer.answerIndex === index}
              onClick={() => dispatch(quiz.actions.submitAnswer({
                questionId: question.id, answerIndex: index
              }))} />
          </Options>
        )
      })}

      {determineCorrectness()}

      {(question.id < 7) ? (<ButtonNext type="button" onClick={() => dispatch(quiz.actions.goToNextQuestion())}>Next</ButtonNext>) : <SubmitButton type="submit" onClick={() => { setSection('summary') }}>Submit</SubmitButton>}
    </QuestionSection>
  )
}

