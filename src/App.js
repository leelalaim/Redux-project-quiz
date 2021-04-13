import React, { useState } from 'react'
import { Provider } from 'react-redux'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { quiz } from 'reducers/quiz'
import { CurrentQuestion } from 'components/CurrentQuestion'
import styled from 'styled-components';
import { Summary } from './components/Summary'
import { Welcome } from './components/Welcome.js'

const reducer = combineReducers({
  quiz: quiz.reducer
})

const store = configureStore({ reducer })

const Container = styled.section`
  background-color: #7090B7;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const App = () => {
  const [section, setSection] = useState('welcome');

  return (
    <Provider store={store}>
      <Container>
        {section === 'welcome' && (<Welcome setSection={setSection} />)}
        {section === 'current-question' && (<CurrentQuestion setSection={setSection} />)}
        {section === 'summary' && (<Summary setSection={setSection} />)}
      </Container>
    </Provider>
  )
}