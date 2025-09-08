@@ .. @@
 import React,{useState} from 'react'
+import { Send, Mic } from 'lucide-react'

 function InputArea({onSubmit}) {

@@ .. @@
   }
   return (
-     <div className='input-area'>
-        <input 
-        className="input-field"
-        placeholder='Type Your Answer Here...'
-        value={answer}
-        onChange={(e) => setAnswer(e.target.value)}
-        onKeyDown={(e)=> e.key === 'Enter' && handleSubmit()}
-        />
-        <button onClick={handleSubmit}
-        className="submit-button"
-         >
-          Submit
-        </button>
-       
-     </div>
+    <div className='input-area'>
+      <div className="input-container">
+        <textarea 
+          className="input-field"
+          placeholder='Share your thoughts and experiences here...'
+          value={answer}
+          onChange={(e) => setAnswer(e.target.value)}
+          onKeyDown={(e)=> e.key === 'Enter' && !e.shiftKey && handleSubmit()}
+          rows={4}
+        />
+        <div className="input-actions">
+          <button className="voice-button" title="Voice input (coming soon)">
+            <Mic size={18} />
+          </button>
+          <button 
+            onClick={handleSubmit}
+            className="submit-button"
+            disabled={!answer.trim()}
+          >
+            <Send size={18} />
+            Submit Answer
+          </button>
+        </div>
+      </div>
+    </div>
   )
 }