import React, { useState } from 'react'
import { Provider } from 'react-redux'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { quiz } from 'reducers/quiz'
import { CurrentQuestion } from 'components/CurrentQuestion'
import { Summary } from './components/Summary'
import { Welcome } from './components/Welcome.js'

const reducer = combineReducers({
  quiz: quiz.reducer
})

const store = configureStore({ reducer })

export const App = () => {
  const [section, setSection] = useState('welcome');

  return (
    <Provider store={store}>
      {section === 'welcome' && (<Welcome setSection={setSection} />)}
      {section === 'current-question' && (<CurrentQuestion />)}
      {section === 'summary' && (<Summary />)}
    </Provider>
  )
}