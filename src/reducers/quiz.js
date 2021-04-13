import { createSlice } from '@reduxjs/toolkit'

// Change these to your own questions!
const questions = [
  { id: 1, questionText: 'What flex property causes flex items to be laid out on multiple lines rather than just one?', options: ['flex-basis', 'flex-flow', 'flex-wrap', 'None of the answers are correct'], correctAnswerIndex: 2 },
  { id: 2, questionText: 'Which CSS font-weight property value is equal to “normal”?', options: ['300', '400', '500', '700'], correctAnswerIndex: 1 },
  { id: 3, questionText: 'What will (0.1 + 0.2).toFixed(2) will be equal to?', options: ['0.300000000004', '0.300', '0.3', '0.30'], correctAnswerIndex: 3 },
  { id: 4, questionText: 'How to get the first element in the array?', options: ['arr{1}', 'arr[0]', 'arr(first)', 'None of the answers are correct'], correctAnswerIndex: 1 },
  { id: 5, questionText: 'What property forces flex items to be displayed at the baseline of their container?', options: ['align-items: flex-start', 'justify-content: flex-end', 'align-items: flex-end', 'justify-content: center'], correctAnswerIndex: 3 },
  { id: 6, questionText: 'The ________________ relational operator means "is not equal to."', options: ['@=', '=!', ':=', '!='], correctAnswerIndex: 3 },
  { id: 7, questionText: 'What is the limit of parameters you can pass to a function?', options: ['2', '4', 'No limit', '6'], correctAnswerIndex: 2 }
]

const initialState = {
  questions,
  answers: [],
  currentQuestionIndex: 0,
  quizOver: false
}

export const quiz = createSlice({
  name: 'quiz',
  initialState,
  reducers: {

    /**
     * Use this action when a user selects an answer to the question.
     * The answer will be stored in the `quiz.answers` state with the
     * following values:
     *
     *    questionId  - The id of the question being answered.
     *    answerIndex - The index of the selected answer from the question's options.
     *    question    - A copy of the entire question object, to make it easier to show
     *                  details about the question in your UI.
     *    answer      - The answer string.
     *    isCorrect   - true/false if the answer was the one which the question says is correct.
     *
     * When dispatching this action, you should pass an object as the payload with `questionId`
     * and `answerIndex` keys. See the readme for more details.
     */
    submitAnswer: (state, action) => {
      const { questionId, answerIndex } = action.payload
      const question = state.questions.find((q) => q.id === questionId)

      if (!question) {
        throw new Error('Could not find question! Check to make sure you are passing the question id correctly.')
      }

      if (question.options[answerIndex] === undefined) {
        throw new Error(`You passed answerIndex ${answerIndex}, but it is not in the possible answers array!`)
      }

      state.answers.push({
        questionId,
        answerIndex,
        question,
        answer: question.options[answerIndex],
        isCorrect: question.correctAnswerIndex === answerIndex
      })
    },

    /**
     * Use this action to progress the quiz to the next question. If there's
     * no more questions (the user was on the final question), set `quizOver`
     * to `true`.
     *
     * This action does not require a payload.
     */
    goToNextQuestion: (state) => {
      if (state.currentQuestionIndex + 1 === state.questions.length) {
        state.quizOver = true
      } else {
        state.currentQuestionIndex += 1
      }
    },

    /**
     * Use this action to reset the state to the initial state the page had
     * when it was loaded. Who doesn't like re-doing a quiz when you know the
     * answers?!
     *
     * This action does not require a payload.
     */
    restart: () => {
      return initialState
    }

  }
})
