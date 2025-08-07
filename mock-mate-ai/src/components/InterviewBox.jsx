import React from 'react'


function InterviewBox({question}) {

 
  return (
    <div className='interview-box'>
      <p className='question-text'>
            {question}
      </p>
    </div>

  )
}

export default InterviewBox