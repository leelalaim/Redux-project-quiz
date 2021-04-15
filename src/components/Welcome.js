import React from 'react'
import styled from 'styled-components'

const WelcomeSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const WelcomeTitle = styled.h1`
  font-size: 80px;
  font-family: 'Helvetica'
  margin: 0px;
  color: #ffe45e;
  text-align: center;
`

const WelcomeButton = styled.button`
  color: #26233a;
  font-size: 20px;
  font-weight: bold;
  border-style: none;
  padding: 20px 30px;
  border-radius: 50px;
  cursor: pointer;
`

export const Welcome = ({ setSection }) => {
  return (
    <WelcomeSection>
      <WelcomeTitle>WELCOME</WelcomeTitle>
      <WelcomeButton
        type="submit"
        value="age"
        onClick={() => {
          setSection('current-question')
        }}
        className="next-button">
        START
      </WelcomeButton>
    </WelcomeSection>
  )
}
