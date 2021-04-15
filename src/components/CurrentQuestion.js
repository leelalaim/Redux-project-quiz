import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { quiz } from '../reducers/quiz';

const QuestionSection = styled.section`
  width: 100vw;
  margin: 0 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`
const Wrapper = styled.div`
  height: auto;
  width: 100%;
  padding: 0px 16px 24px 16px;
  box-sizing: border-box;
`;

const QuestionTitle = styled.h1`
  font-size: 40px;
  font-family: 'Helvetica'
  margin: 0px;
  color: #ffffff;
  text-align: left;
`

const LabelTitle = styled.label`
  position: absolute;
  top: 25%;
  left: 4px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: white;
  border: 1px solid #bebebe;
`

const ButtonNext = styled.button`
  color: #26233a;
  font-size: 20px;
  font-weight: bold;
  border-style: none;
  padding: 20px 30px;
  border-radius: 50px;
  cursor: pointer;
`

const Options = styled.section`
  display: flex;
  align-items: center;
  height: 48px;
  position: relative;
`;

const SubmitButton = styled.button`
  color: #26233a;
  font-size: 20px;
  font-weight: bold;
  border-style: none;
  padding: 20px 30px;
  border-radius: 50px;
  cursor: pointer;
`

const RadioButton = styled.input`
opacity: 0;
  z-index: 1;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  margin-right: 10px;
  &:hover ~ ${LabelTitle} {
    background: #bebebe;
    &::after {
      content: "";
      display: block;
      border-radius: 50%;
      width: 12px;
      height: 12px;
      margin: 6px;
      background: #eeeeee;
    }
  }
  ${(props) => props.checked && ` 
    &:checked + ${LabelTitle} {
      background: #db7290;
      border: 1px solid #db7290;
      &::after {
        content: "";
        display: block;
        border-radius: 50%;
        width: 12px;
        height: 12px;
        margin: 6px;
        box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.1);
        background: white;
      }
    }
  `}
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
      <Wrapper>
        {question.options.map((option, index) => {
          return (
            <Options>
              <RadioButton
                key={index}
                type="radio"
                id={index}
                name="contact"
                disabled={answer !== undefined}
                checked={answer !== undefined && answer.answerIndex === index}
                onClick={() => dispatch(quiz.actions.submitAnswer({
                  questionId: question.id, answerIndex: index
                }))} />
              <LabelTitle />
              <div htmlFor={option}>{option}</div>
            </Options>
          )
        })}
      </Wrapper>
      {determineCorrectness()}
      <h3>{currentQuestionIndex + 1} / 7</h3>

      {(question.id < 7) ? (<ButtonNext type="button" onClick={() => dispatch(quiz.actions.goToNextQuestion())}>Next</ButtonNext>) : <SubmitButton type="submit" onClick={() => { setSection('summary') }}>Submit</SubmitButton>}
    </QuestionSection>
  )
}

