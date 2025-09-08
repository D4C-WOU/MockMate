import React,{useState} from 'react'
import { Send, Mic } from 'lucide-react'

function InputArea({onSubmit}) {
  const [answer, setAnswer] = useState('')

  const handleSubmit = () => {
    if (answer.trim()) {
      onSubmit(answer)
      setAnswer('')
    }
  }
  return (
    <div className='input-area'>
      <div className="input-container">
        <textarea 
          className="input-field"
          placeholder='Share your thoughts and experiences here...'
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          onKeyDown={(e)=> e.key === 'Enter' && !e.shiftKey && handleSubmit()}
          rows={4}
        />
        <div className="input-actions">
          <button className="voice-button" title="Voice input (coming soon)">
            <Mic size={18} />
          </button>
          <button 
            onClick={handleSubmit}
            className="submit-button"
            disabled={!answer.trim()}
          >
            <Send size={18} />
            Submit Answer
          </button>
        </div>
      </div>
    </div>
  )
}

export default InputArea