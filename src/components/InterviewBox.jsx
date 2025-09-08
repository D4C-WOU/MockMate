@@ .. @@
 import React from 'react'
+import { MessageCircle, Sparkles } from 'lucide-react'


 function InterviewBox({question}) {

  
   return (
   )
 }
-    <div className='interview-box'>
-      <p className='question-text'>
-            {question}
-      </p>
+    <div className='interview-box'>
+      <div className="question-header">
+        <div className="ai-avatar">
+          <MessageCircle size={24} />
+          <Sparkles className="sparkle" size={16} />
+        </div>
+        <span className="ai-label">AI Interviewer</span>
+      </div>
+      <div className='question-content'>
+        <p className='question-text'>{question}</p>
+      </div>
     </div>

   )
 }