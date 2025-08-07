import React,{useState} from 'react'

function InputArea({onSubmit}) {

  const[answer,setAnswer]=useState('')

  const handleSubmit = ()=>{
    if (answer.trim()){
      onSubmit(answer)
      setAnswer('')
    }
  }
  return (
     <div className='input-area'>
        <input 
        className="input-field"
        placeholder='Type Your Answer Here...'
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        onKeyDown={(e)=> e.key === 'Enter' && handleSubmit()}
        />
        <button onClick={handleSubmit}
        className="submit-button"
         >
          Submit
        </button>
       
     </div>
  )
}

export default InputArea