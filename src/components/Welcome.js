import React from 'react';

export const Welcome = ({ setSection }) => {
  return (
    <div>
      <h1>WELCOME</h1>
      <button
        type="submit"
        value="age"
        onClick={() => { setSection('current-question') }}
        className="next-button">
        START
      </button>
    </div>
  )
}
